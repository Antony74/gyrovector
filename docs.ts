import fsp from 'fs/promises';
import path from 'path';

import { rimraf } from 'rimraf';
import * as typedoc from 'typedoc';
import prettier from 'prettier';

type Comment = { summary: [{ text: string }] };

type Node = { name: string; children?: Node[]; comment?: Comment };

const nodeLog = (node: Node, depth: number) => {
    console.log(`${' '.repeat(depth * 4)}${node.name}`);
    (node.children ?? []).forEach((child) => nodeLog(child, depth + 1));
};

const findNode = (name: string, parent: Node): Node | undefined => {
    return (parent.children ?? []).find((node) => node.name === name);
};

const documentClass = (node: Node): string => {
    const summary = node.comment
        ? node.comment.summary.map((summary) => summary.text)
        : [];

    return [`### Class ${node.name}`, ``, ...summary].join('\n');
};

const main = async () => {
    const docsPath = path.join(__dirname, 'docs');

    // clean up
    console.log('clean up');

    const filesInDocs = await fsp.readdir(docsPath);

    await Promise.all(
        filesInDocs
            .filter(
                (filename) =>
                    filename !== 'header.md' && filename !== 'footer.md',
            )
            .map((filename) => path.join(docsPath, filename))
            .map((pathname) => rimraf(pathname)),
    );

    // run typedoc
    console.log('run typedoc');

    const app = await typedoc.Application.bootstrap({
        entryPoints: ['src/*'],
    });

    const project = await app.convert();

    if (project) {
        await app.generateDocs(project, docsPath);
        await app.generateJson(project, path.join(docsPath, 'docs.json'));
    }

    // README.md
    console.log('README.md');

    const [rawJson, header, footer, rawPackageJson] = await Promise.all(
        ['docs/docs.json', 'header.md', 'footer.md', 'package.json']
            .map((filename) => path.join(__dirname, filename))
            .map((pathname) => fsp.readFile(pathname, { encoding: 'utf-8' })),
    );

    const root: Node = JSON.parse(rawJson);
    const packageJson = JSON.parse(rawPackageJson);

    nodeLog(root, 0);

    const prettierOptions = { ...packageJson.prettier, parser: 'markdown' };

    const [
        factoryModule,
        spaceModule,
        vectorLikeModule,
        gyrovectorModule,
        gyrovectorXYModule,
        vectorModule,
        vectorXYModule,
    ]: Node[] = [
        findNode('gyrovectorSpaceFactory', root)!,
        findNode('vectorSpaceLike', root)!,
        findNode('vectorLike', root)!,
        findNode('gyrovector', root)!,
        findNode('gyrovectorXY', root)!,
        findNode('vector', root)!,
        findNode('vectorXY', root)!,
    ];

    const classes: Node[] = [
        findNode('GyrovectorSpaceFactory', factoryModule)!,
        findNode('VectorSpaceLike', spaceModule)!,
        findNode('VectorLike', vectorLikeModule)!,
        findNode('Gyrovector', gyrovectorModule)!,
        findNode('GyrovectorXY', gyrovectorXYModule)!,
        findNode('Vector', vectorModule)!,
        findNode('VectorXY', vectorXYModule)!,
    ];

    const sections = [header, ...classes.map(documentClass), footer];

    const output = await prettier.format(sections.join('\n'), prettierOptions);

    await fsp.writeFile(path.join(__dirname, 'README.md'), output);

    // Done
    console.log('done');
};

main();

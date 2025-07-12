import fsp from 'fs/promises';
import path from 'path';

import { rimraf } from 'rimraf';
import * as typedoc from 'typedoc';
import prettier from 'prettier';

type Comment = { summary: [{ text: string }] };

type Node = {
    name: string;
    children?: Node[];
    comment?: Comment;
    signatures?: Node[];
    parameters?: Node[];
};

const nodeLog = (kind: string, node: Node, depth: number) => {
    console.log(`${' '.repeat(depth * 4)}${kind} ${node.name}`);
    (node.children ?? []).forEach((child) =>
        nodeLog('child', child, depth + 1),
    );
    (node.signatures ?? []).forEach((child) =>
        nodeLog('sig', child, depth + 1),
    );
    (node.parameters ?? []).forEach((child) =>
        nodeLog('param', child, depth + 1),
    );
};

const findNode = (name: string, parent: Node): Node | undefined => {
    return (parent.children ?? []).find((node) => node.name === name);
};

const getSummary = (node: Node): string => {
    const summary = node.comment
        ? node.comment.summary.map((summary) => summary.text)
        : [];

    return summary.join('\n');
};

const summarizeSignature = (node: Node): string => {
    const params = (node.parameters ?? [])
        .map((param) => param.name)
        .join(`, `);

    return `> ${node.name}(${params})`;
};

const documentParameter = (node: Node): string => {
    return [`###### ${node.name}`, ``, getSummary(node)].join('\n');
};

const documentParameters = (node: Node): string => {
    const params = node.parameters ?? [];

    return [`##### Parameters`, ``, ...params.map(documentParameter)].join(
        '\n',
    );
};

const documentMethod = (node: Node): string => {
    const signatures = (node.signatures ?? []);

    return [
        `#### ${node.name}`,
        ``,
        ...signatures.map(summarizeSignature),
        ``,
        getSummary(node),
        ``,
        ...signatures.map(documentParameters),
    ]
        .join('\n')
        .trim();
};

const documentClass = (node: Node): string => {
    const children = (node.children ?? []).map(documentMethod);

    return [`### Class ${node.name}`, ``, getSummary(node), ``, ...children]
        .join('\n')
        .trim();
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

    nodeLog('root', root, 0);

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

    const factory = findNode('GyrovectorSpaceFactory', factoryModule)!;
    factory.children?.shift();
    factory.children![0].signatures =
        factory.children![0].signatures?.slice(-1);

    const classes: Node[] = [
        factory,
        findNode('VectorSpaceLike', spaceModule)!,
        findNode('VectorLike', vectorLikeModule)!,
        { ...findNode('Gyrovector', gyrovectorModule)!, children: [] },
        { ...findNode('GyrovectorXY', gyrovectorXYModule)!, children: [] },
        { ...findNode('Vector', vectorModule)!, children: [] },
        { ...findNode('VectorXY', vectorXYModule)!, children: [] },
    ];

    const sections = [header, ...classes.map(documentClass), footer];

    const output = await prettier.format(sections.join('\n'), prettierOptions);

    await fsp.writeFile(path.join(__dirname, 'README.md'), output);

    // Done
    console.log('done');
};

main();

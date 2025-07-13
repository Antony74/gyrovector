import fsp from 'fs/promises';
import path from 'path';

import { rimraf } from 'rimraf';
import * as typedoc from 'typedoc';
import prettier from 'prettier';

type CommentNode = { kind: string; text: string };

type Comment = {
    summary: CommentNode[];
    blockTags: { tag: string; content: CommentNode[] }[];
};

type Node = {
    name: string;
    children?: Node[];
    comment?: Comment;
    signatures?: Node[];
    parameters?: Node[];
    type?: { declaration?: Node };
};

const nodeLog = (kind: string, node: Node, depth: number): string => {
    const result = [`${' '.repeat(depth * 4)}${kind} ${node.name}`];

    (node.children ?? []).forEach((child) =>
        result.push(nodeLog('child', child, depth + 1)),
    );

    (node.signatures ?? []).forEach((child) =>
        result.push(nodeLog('sig', child, depth + 1)),
    );

    (node.parameters ?? []).forEach((child) =>
        result.push(nodeLog('param', child, depth + 1)),
    );

    if (node.type && node.type.declaration) {
        result.push(nodeLog('type', node.type.declaration, depth + 1));
    }

    return result.join('\n');
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

const summarizeSignature = (name: string, node: Node): string => {
    const params = (node.parameters ?? [])
        .map((param) => '`' + param.name + '`')
        .join(`, `);

    return `> ${name}(${params})`;
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

const getBlockTag = (node: Node, tag: string): CommentNode => {
    const signatures =
        node.signatures ?? node.type?.declaration?.signatures ?? [];

    let result = node.comment?.blockTags.filter(
        (commentNode) => commentNode.tag === tag,
    )[0]?.content[0];

    if (!result) {
        result = signatures[0].comment?.blockTags.filter(
            (commentNode) => commentNode.tag === tag,
        )[0]?.content[0];
    }

    if (!result) {
        result = { kind: '', text: '' };
    }

    return result;
};

const documentMethod = (node: Node): string => {
    const signatures =
        node.signatures ?? node.type?.declaration?.signatures ?? [];

    const returnsNode = getBlockTag(node, '@returns');
    const exampleNode = getBlockTag(node, '@example');

    return [
        `#### ${node.name}`,
        ``,
        ...signatures.map((sig) => summarizeSignature(node.name, sig)),
        ``,
        getSummary(node),
        ``,
        ...signatures.map(documentParameters),
        ``,
        `##### Returns`,
        ``,
        returnsNode.text,
        ``,
        `##### Example`,
        ``,
        exampleNode.text,
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

    // docs/tree.txt
    console.log('tree.txt');

    const [rawJson, header, footer, rawPackageJson] = await Promise.all(
        ['docs/docs.json', 'header.md', 'footer.md', 'package.json']
            .map((filename) => path.join(__dirname, filename))
            .map((pathname) => fsp.readFile(pathname, { encoding: 'utf-8' })),
    );

    const root: Node = JSON.parse(rawJson);
    const packageJson = JSON.parse(rawPackageJson);

    await fsp.writeFile(
        path.join(docsPath, 'tree.txt'),
        nodeLog('root', root, 0),
    );

    // README.md
    console.log('README.md');

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

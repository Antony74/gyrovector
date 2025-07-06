import fsp from 'fs/promises';
import path from 'path';

import { rimraf } from 'rimraf';
import * as typedoc from 'typedoc';
import prettier from 'prettier';

const main = async () => {
    const docsPath = path.join(__dirname, 'docs');

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

    console.log('run typedoc');

    const app = await typedoc.Application.bootstrap({
        entryPoints: ['src/*'],
    });

    const project = await app.convert();

    if (project) {
        await app.generateDocs(project, docsPath);
        await app.generateJson(project, path.join(docsPath, 'docs.json'));
    }

    console.log('README.md');

    const [rawJson, header, footer, rawPackageJson] = await Promise.all(
        ['docs/docs.json', 'header.md', 'footer.md', 'package.json']
            .map((filename) => path.join(__dirname, filename))
            .map((pathname) => fsp.readFile(pathname, { encoding: 'utf-8' })),
    );

    const json = JSON.parse(rawJson);
    const packageJson = JSON.parse(rawPackageJson);

    const prettierOptions = {...packageJson.prettier, parser: 'markdown'};

    const output = await prettier.format([header, footer].join('\n'), prettierOptions);

    await fsp.writeFile(path.join(__dirname, 'README.md'), output);

    console.log('done');
};

main();

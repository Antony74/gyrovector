import fsp from 'fs/promises';
import path from 'path';

import { rimraf } from 'rimraf';
import * as typedoc from 'typedoc';

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
        entryPoints: ['src/*']
    });

    const project = await app.convert();

    if (project) {
        await app.generateDocs(project, docsPath);
        await app.generateJson(project, path.join(docsPath, 'docs.json'));
    }

    console.log('done');
};

main();

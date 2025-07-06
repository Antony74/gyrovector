import fsp from 'fs/promises';
import path from 'path';

import { rimraf } from 'rimraf';

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
            .map((filename) => rimraf(path.join(docsPath, filename))),
    );

    console.log('done');
};

main();

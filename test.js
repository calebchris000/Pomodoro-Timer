import fs from 'fs'

let item;
async function musics() {
    const get = await fs.promises.readdir('./public/audio')
    console.log(get);
}

musics()

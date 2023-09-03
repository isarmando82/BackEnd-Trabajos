import fs from 'fs'

const readDb = async (folderPath, filePath) => {
    await fs.promises.mkdir(folderPath, {recursive: true})
    if (!fs.existsSync(filePath)){
            await fs.promises.writeFile(filePath, "[]")
            const list = await fs.promises.readFile(filePath, 'utf8')
            return list
    }else{
        const list = await fs.promises.readFile(filePath, 'utf8')
        return list
    }
    
}

export default readDb
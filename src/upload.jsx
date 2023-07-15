import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "./firebase"


const uploadPhotoSyntax = (file, fileName) => {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `assertImages/${fileName}`)
        uploadBytes(storageRef, file).then(
            (snapshot) => {
                console.log("Success uploading photo")

                getDownloadURL(storageRef).then((img_url) => {
                    resolve(img_url)
                }).catch((err) => {
                    reject(err)
                })
            }
        ).catch((err) => {
            console.log(`${err}`, "#fb4d4d")
            reject(err)
        })
    })
}

export default uploadPhotoSyntax

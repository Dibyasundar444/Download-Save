import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, PermissionsAndroid, Alert, Linking } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import RNFS from 'react-native-fs';


const App = () => {
    const IMG_URL_1 = "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png";

    const _handleDownloadClick = async () => {

        const fileName = IMG_URL_1.split('/').pop();
        const ext = IMG_URL_1.split('.').pop();
        let type = "";
        if (ext === "png" || ext === "jpg" || ext === "jpeg") {
            type = `image/${ext}`;
        }
        // else if(type === ""){
        // // some other conditions
        // }

        const filePath = `${RNFS.DownloadDirectoryPath}/${fileName}`;

        ReactNativeBlobUtil
            .config({
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    mime: type,
                    description: 'File downloaded by download manager.',
                    title: fileName,
                    path: filePath,
                },
                path: filePath,
            })
            .fetch('GET', IMG_URL_1, {})
            .progress((received, total) => {
                // console.log('progress', received / total);
            })
            .then(async (res) => {
                const path = res.path();
                console.log('Downloaded file path:', path);
            })
            .catch(err => {
                console.error('Download error:', err);
            });
    };

    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity
                style={styles.download_btn}
                onPress={_handleDownloadClick}
            >
                <Text style={styles.download_text}>Download</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center'
    },
    download_btn: {
        alignSelf: 'center',
        height: 40,
        width: '50%',
        backgroundColor: "blue",
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    download_text: {
        color: "#fff",
        fontSize: 20,
        fontWeight: '600'
    }
});

export default App;

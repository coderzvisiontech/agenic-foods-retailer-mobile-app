import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import { showToast } from '../../../../Utils/Helper/toastHelper';
import { requestStoragePermission } from '../../../../Utils/CommonFunctions';

export const downloadAndOpenFile = async ({ fileUrl, fileName }) => {
    try {
        if (!fileUrl) {
            showToast('error', 'No file URL provided');
            return;
        }

        const hasPermission = await requestStoragePermission();
        if (!hasPermission) return;

        const downloadPath =
            Platform.OS === 'android'
                ? `${RNFS.DownloadDirectoryPath}/${fileName}`
                : `${RNFS.DocumentDirectoryPath}/${fileName}`;

        const downloadResult = await RNFS.downloadFile({
            fromUrl: fileUrl,
            toFile: downloadPath,
        }).promise;

        if (downloadResult.statusCode === 200) {
            showToast('success', 'File downloaded successfully');
            await FileViewer.open(downloadPath, { showOpenWithDialog: true });
        } else {
            showToast('error', 'Download failed');
        }
    } catch (error) {
        console.error('📥 Download Error:', error);
        showToast('error', 'Something went wrong while downloading');
    }
};
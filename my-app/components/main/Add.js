import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


export default function App({ navigation }) {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus  = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const galleryStatus =await ImagePicker.requestCameraRollPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');

    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri)
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,

    });

    console.log(result);
    if(!result.canceled){
      setImage(result.uri)
    }
  };

  if (hasCameraPermission===null || hasGalleryPermission===false) {
    // Camera permissions are still loading
    return <View />;
  }

  if (hasCameraPermission===false || hasGalleryPermission===false) {
    // Camera permissions are not granted yet
      return <Text>No access to camera</Text>
  }
  return (
    <View style={{ flex: 1}}>
      <View style={ styles.cameraContainer}>
        <Camera 
          ref={ref => setCamera(ref)}
          style={ styles.fixedRatio} 
          type={type}
          ratio={'1:1'}/>
      </View>

      <Button
        title='Flip Image'
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}>
        <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
      </Button>
      <Button title="Take Picture" onPress={() => takePicture()}/>
      <Button title="Pick Image From Gallery" onPress={() => pickImage()}/>
      <Button title="Save" onPress={() => navigation.navigate('Save',{image})}/>
      {image && <Image source={{uri:image}} style={{flex:1}}/>}
    </View>  
    );
  }

const styles = StyleSheet.create({
    cameraContainer:{
        flex: 1,
        flexDirection: 'row'
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1
    }
})


import React, {useCallback} from 'react';
import {Image, StyleSheet, View, Dimensions} from 'react-native';
import {Text} from 'react-native-elements';
import {getBottomSpace} from 'react-native-iphone-x-helper';

import LoginWithGoogle from './LoginWithGoogle';
import LoginWithFacebook from './LoginWithFacebook';
import Images from '../../constants/Images';
import {connect} from 'react-redux';
import {setProfile} from '../../actions/authAction';

const {width} = Dimensions.get('window');

function Login(props) {
  const onLogin = useCallback(
    profile => {
      props.profile(profile);
      props.navigation.navigate('Home');
    },
    [props],
  );
  const onFail = useCallback(error => {
    console.log(error);
  }, []);
  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <Image
          style={{width: width / 1.1, height: width / 1.1}}
          source={Images.Logo}
        />
        <LoginWithFacebook onPressLogin={onLogin} onFail={onFail} />
        <LoginWithGoogle onPressLogin={onLogin} onFail={onFail} />
      </View>
      <View style={styles.bottom}>
        <Text>Copyright@ by </Text>
      </View>
    </View>
  );
}

const mapDispatchToProps = dispatch => ({
  profile: profile => {
    dispatch(setProfile(profile));
  },
});

const mapStateToProps = state => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    paddingTop: 15,
    alignItems: 'center',
  },
  bottom: {
    paddingBottom: getBottomSpace(),
  },
});

import React from 'react';
import { Button, ScrollView, AsyncStorage } from 'react-native';


import styles from '../../../globalStyles';
import Card from '../../shared/Card/Card';

class DashboardScreen extends React.Component {
  static navigationOptions = {
    title: 'Dashboard',
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Card
          header="Rutinas"
          body="Consulta tus rutinas, los ejercicios que las componenten y mucho más en esta sección."
          image="https://content.active.com/Assets/Active.com+Content+Site+Digital+Assets/Fitness/580x350/Push-Up.jpg"
          titleButton="Ir a mis rutinas"
          onClick={this.goToRoutine}
        />
        <Card
          header="Dietas"
          body="Consulta tus dietas, los alimentos que contienen y todos sus detalles en esta sección."
          image="https://images.agoramedia.com/everydayhealth/gcms/Why-Carbohydrates-Are-Important-for-Your-Diet-722x406.jpg"
          titleButton="Ir a mis dietas"
          onClick={this.goToDiet}
        />
        <Button title="Cerrar sesión" onPress={this.signOutAsync} />
      </ScrollView>
    );
  }



  goToRoutine = () => {
    this.props.navigation.navigate('RoutineList');
  };

  goToDiet = () => {
    this.props.navigation.navigate('Diets');
  };

  signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
};

export default DashboardScreen;
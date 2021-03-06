import {createStackNavigator} from 'react-navigation-stack';
import CreateRecipeForm from '../components/CreateRecipeForm';
import React from 'react';
import {Button} from 'react-navigation';
import HomePage from '../components/HomePage';
import IndividualRecipes from '../components/IndividualRecipe.js'

const CreateNavigator = createStackNavigator({
    Create : {screen : CreateRecipeForm, 
            //   navigationOptions : {
            //       title : "Create",
            //       headerLeft: null
            //   }
        },
    Home : {screen : HomePage},
    IndividualR : {screen : IndividualRecipes,  
                    navigationOptions : {
                    // title : "CookBook"
                    headerLeft: null
                }
                }
}, {initialRouteName : 'Create'})

export default CreateNavigator;


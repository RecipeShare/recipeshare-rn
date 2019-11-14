import React, {useState, useEffect} from "react";
import {View,TouchableOpacity, TextInput, Button, StyleSheet, Text, ScrollView} from "react-native";
import axios from "axios";

import RecipeList from './RecipeList.js'

const Search = () => {
    let [dish, setDish] = useState('')
    let [recipeList, setRecipeList] = useState([])

    const getRecipeList = (dish) => {
        axios.get(
          `https://recipeshare-development.herokuapp.com/recipes?title=${dish}`
        )
        .then(res => {
            setRecipeList([])
            console.log('recipe count', res.data.length);
            setRecipeList(res.data);
        })
        .catch(err => console.log(err));
    }

    useEffect(() =>{
        getRecipeList(dish);
    },[dish]);

    return(
        <View>
                <TextInput
                style={styles.textInput}
                placeholder="What dish are you looking for?"
                placeholderTextColor="#D3D3D3"
                value={dish}
                onChangeText={dish => setDish(dish)}
                />
                
                <ScrollView>
                    {recipeList.length>=1  && <RecipeList recipeList={recipeList} setRecipeList={setRecipeList} /> }
                </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
textInput: {
    //flex: 1,
    height: 40,
    //width: 300,
    fontSize: 18,
    margin: 7,
    fontWeight: 'bold',
    color: 'black',
    paddingLeft: 3,
    minHeight: '5%',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d6d7da'
},
button: {
    borderRadius: 4,
    borderWidth: 2,
    marginLeft: 100,
    marginRight: 100,
    borderColor: '#3BA405',
    backgroundColor: `#3BA405`
}
})

export default Search;
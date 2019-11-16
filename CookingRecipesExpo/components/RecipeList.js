import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import {ScrollView, View} from 'react-native';
import axiosWithAuth from '../utils/axiosWithAuth';
import axios from 'axios';


const RecipeList = (props) => {
    let LeftimageHeight = 0;
    let RightimageHeight = 0;
    let LeftHeight = 0;
    let RightHeight= 0;
    let recipeList= props.recipes;

    const [recipes, setRecipes] = useState([]); //namespace collision with the recipes in <Search/>
    let [cookbook, setCookbook] = useState([]);
    // let [refreshLikes, setRefreshLikes] = useState(false);

    const cookbookURL = 'https://recipeshare-development.herokuapp.com/cookbook/';
    // let cookbook = [];

    const likedByUser = cookbook => {
        // console.log('cookbook', cookbook);
        // console.log('props.recipes', props.recipes);
        recipeList = recipeList.map(rec => {
            // console.log('rec id', rec.id);
            // console.log('found rec in cookbook', cookbook.find(({id}) => id === rec.id));
            const match = cookbook.find(({id}) => id === rec.id);
            if (match) {
              rec.likedByUser = true;
            } else {
              rec.likedByUser = false;
            }
          return rec;
        })
        setRecipes(recipeList);
    }

    const getCookbook = async () => {
        try{
            const axiosAuth = await axiosWithAuth();
            const res = await axiosAuth.get(cookbookURL);
            setCookbook(res.data);
            likedByUser(res.data);

        }catch(err){
            setRecipes(recipeList)
        }
        
    }
    
    useEffect(() =>{
        console.log('useEffect triggered in RecipeList');
        // console.log('props in RecipeList', props.recipes);
        // setRefreshLikes(props.refresh);
        getCookbook();
    },[]);
    
    const divideArray =()=>{
        if(Math.floor(recipes.length/2)  ==0){
            return 1
        }else{
            return Math.floor(recipes.length/2) 
        }      
    }
    
    const LeftHeightAdjustment = () => {    
        if(LeftHeight === 0){  
            LeftHeight= LeftHeight +1
            return 220
        }if(LeftHeight===1){
            LeftHeight = LeftHeight -1
            return 250
        }
    }
    const RightHeightAdjustment = () => {     
        if(RightHeight === 2){  
            RightHeight= RightHeight +1
            return 235
        }if(RightHeight===3){
            RightHeight = RightHeight -1
            return 225
        }
    }
    const LeftadjustImageHeight = () => {  
        if(LeftimageHeight === 0){  
            LeftimageHeight= LeftimageHeight +1
            return 150
        }if(LeftimageHeight===1){
            LeftimageHeight = LeftimageHeight -1
            return 185
        }
    }
    const RightadjustImageHeight = () => {  
        if(RightimageHeight === 0){  
            RightimageHeight= RightimageHeight +1
            return 185
        }if(RightimageHeight===1){
            RightimageHeight = RightimageHeight -1
            return 150
        }
    }

    return (
        <ScrollView >
            <View style={{flexDirection: 'row', marginLeft: "4%"}}>
                <View style={{flexDirection: 'column',width: "39%", marginRight:"10%", paddingBottom: "60%"}}>
                 {recipes.map( (recp, index) =>  index%2==0 
                 &&
                 <Recipe key={recp.id} 
                 recipe={recp} recipeList={props.recipes} 
                 setRecipeList={props.setRecipes} imageHeight={LeftadjustImageHeight()} 
                 cardHeight={LeftHeightAdjustment()}
                 courseType={props.courseType}
                //  cookbookRefresh={props.cookbookRefresh} 
                //  setCookbookRefresh={props.setCookbookRefresh}
                 />)
                 }
                </View>
                 <View style={{flexDirection: 'column', width: "39%", paddingBottom: "60%"}}>
                 {recipes.map( (recp, index) => index%2 ==1 && <Recipe key={recp.id} 
                 recipe={recp}  
                 imageHeight={RightadjustImageHeight()} 
                 cardHeight={RightHeightAdjustment()}
                 courseType={props.courseType}
                //  cookbookRefresh={props.cookbookRefresh} 
                //  setCookbookRefresh={props.setCookbookRefresh}
                 />)}
                </View>
            </View>
         </ScrollView>
    )  
}

export default RecipeList;
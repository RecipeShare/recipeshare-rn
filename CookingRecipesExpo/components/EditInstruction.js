import React, {useState,}from 'react';
import {TextInput, Text, Image} from 'react-native';
import styles from '../styles/createRecipeStyles';
import add from '../assets/add_circle_32px.png';

const EditInstruction = ({ recipe, setRecipe, index, stepsArray}) => {
    output = [];
for (i = 0; i < stepsArray.length; i++) {
    obj = {text: stepsArray[i]};

    output.push(obj);

}
//console.log('testing function for steps', output)

    let [step, setStep] = useState({text : ''});
    let [editedSteps, setEditedSteps] = useState(output);

//console.log('edited steps', editedSteps)

    const handleChange = async (event) => {
            await setStep({text : event});
            //console.log('step inside handlechange',step)
        }
        
        
        
        const handleBlur = (event) => {
            const recipeSteps = [...recipe.steps];
            setEditedSteps([...editedSteps, step])
            console.log('editedSteps in the handleblur function', editedSteps)
            console.log('recipe.steps in the instruction component', recipe.steps)
            console.log('new step', step)

        if (editedSteps.length) {
            for (let i=0; i<editedSteps.length; i++) {
                for (let j=0; j<recipeSteps.length; j++) {
                    if (editedSteps[i].text === recipeSteps[j]) {
                        recipeSteps.splice(j,1,step.text);
                    }
                }
            }
            setRecipe({...recipe, steps : recipeSteps });
        } else {
            setRecipe({...recipe, steps : [...recipe.steps, step.text] });
        }
        
    }

    //console.log('recipe.steps in the instruction component', recipe.steps)

    return (
        <>

            {/* <View style = {, marginBottom: 20, borderWidth: 3, borderColor: "red"}}> */}
                <Text style={{marginLeft: 14}}>Step {index + 1}</Text>
                <TextInput 
                    style={{  
                        height: 76,
                        padding: 10, 
                        borderWidth: 0.8, 
                        borderColor: '#363838',
                         borderRadius: 4,
                         marginLeft: 14, marginBottom: 20,
                        marginRight: 14,
                    marginTop: 10}}
                    placeholder=" Add Instructions"
                    multiline={true}
                    onChangeText ={(event) => handleChange(event)}
                    onBlur={handleBlur}
                    value={step.text ? step.text : editedSteps[index].text} 
                />
            {/* </View> */}

      </>
    )
}


export default EditInstruction;
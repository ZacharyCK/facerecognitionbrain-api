async function processingImageAPI (image) {
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // In this section, we set the user authentication, user and app ID, model details, and the URL
    // of the image we want as an input. Change these strings to run your own example.
    //////////////////////////////////////////////////////////////////////////////////////////////////
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = 'ef95d17a1766421b9335c5eea1684a77';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'zachary_c_kohs';
    const APP_ID = 'smartbrain';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
    const IMAGE_URL = image;

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // Data to send to the Clarifai API
    //////////////////////////////////////////////////////////////////////////////////////////////////
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                        // "base64": IMAGE_BYTES_STRING
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    // Fetch From Clarifai API
    const apiFetch = await fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
    const response = await apiFetch.json()
    
    // return the regions of the faces
    return response.outputs[0].data.regions
    
}

const handleImage = (req, res, db) => {
    const {id} = req.body
    processingImageAPI(req.body.image).then(imageRegions => {
        db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json({
                entries: entries[0].entries, 
                regions: imageRegions
            })
        })
        .catch(err => {
            res.status(400).json('Unable to get entries.')
        })
    }) 
}

module.exports = {
    handleImage: handleImage
};
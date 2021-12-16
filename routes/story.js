const express = require("express");
const axios = require("axios");

const router = express.Router();

const instagramAccountId = process.env.ACCOUNT_ID;

const accessToken = process.env.ACCESS_TOKEN;

const graphUrl = "https://graph.facebook.com/v12.0";
const storyIds = [];
const mediaData = [{
    message: "Empty"
}];
const fields = 'caption,id,ig_id,media_product_type,media_type,media_url,owner,permalink,shortcode,thumbnail_url,timestamp,username'

router.get("/get-stories", async (req, res, next) => {
    try {
        const response = await axios.get(
            `${graphUrl}/${instagramAccountId}/stories`,
            {
                params: {
                    access_token: accessToken,
                },
            }
        );

        const data = response.data.data;
        await data.forEach(element => {
            storyIds.push(element.id)
        });
        console.log(storyIds)

        for(let i = 0; i<storyIds.length; i++){
            const response = await axios.get(`${graphUrl}/${storyIds[i]}/?fields=${fields}`, {
                params: {
                    access_token: accessToken
                },
            });
            mediaData.push(response.data);
        }

        res.send(mediaData);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});



router.get("/get-media", async (req, res, next) => {
    try {
        const response = await axios.get(`${graphUrl}/${tempMediaId}/?fields=${fields}`, {
            params: {
                access_token: accessToken
            },
        });
        console.log(response.data);
        res.send(response.data);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

module.exports = router;

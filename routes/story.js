const express = require("express");
const axios = require("axios");
// require("dotenv").config({ path: __dirname + "/.env" });
const router = express.Router();

const graphUrl = "https://graph.facebook.com/v12.0";
const storyIds = [];
const mediaData = [];

const fields =
    "caption,id,ig_id,media_product_type,media_type,media_url,owner,permalink,shortcode,thumbnail_url,timestamp,username";



router.get("/get-stories", async (req, res, next) => {
    const instagramAccountId = process.env.ACCOUNT_ID;

    const accessToken = process.env.ACCESS_TOKEN;

    const url = `${graphUrl}/${instagramAccountId}/stories`;
    try {
        const response = await axios.get(url, {
            params: {
                access_token: accessToken,
            },
        });

        const data = response.data.data;
        await data.forEach((element) => {
            storyIds.push(element.id);
        });
        console.log(storyIds);

        for (let i = 0; i < storyIds.length; i++) {
            const response = await axios.get(
                `${graphUrl}/${storyIds[i]}/?fields=${fields}`,
                {
                    params: {
                        access_token: accessToken,
                    },
                }
            );
            mediaData.push(response.data);
        }

        res.send(mediaData);
    } catch (err) {
        //console.log(err);
        res.send(err);
    }
});

const tempMediaId = "17939014930682266"
router.get("/get-media", async (req, res, next) => {
    const accessToken = process.env.ACCESS_TOKEN;
    try {
        const response = await axios.get(
            `${graphUrl}/${tempMediaId}/?fields=${fields}`,
            {
                params: {
                    access_token: accessToken,
                },
            }
        );
        console.log(response.data);
        res.send(response.data);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

module.exports = router;

const { Client } = require("@notionhq/client")
const {NOTION_APIKEY, NOTION_DBID} = require('../config');

const NotionUtils = {}

NotionUtils.createLog = async(title, url, hasError, error)=>{
    // Try catch to avoid notion errors
    try{
        const notion = new Client({
            auth: NOTION_APIKEY
        });
    
        const parentPage = {
            "type": "database_id",
            "database_id": NOTION_DBID
        }
    
        let pageProperties = {
            "Titulo": {
                "title": [
                    {
                        "text": {
                            "content": title
                        }
                    }
                ]
            }
        }

        if(url){
            const urlInfo = {
                "url": {
                    "url": url
                }
            }
            pageProperties = {...pageProperties, ...urlInfo}
        }

        if(hasError){
            const errorTag = {
                "Etiquetas": {
                    "multi_select": [{"name": 'error'}]
                },
                'error': {
                    rich_text: [{text: {content: error}}],
                }
            }
            pageProperties = {...pageProperties, ...errorTag}
        }
    
        notion.pages.create({
            "parent": parentPage,
            "properties": pageProperties
        })
    }catch(error){

    }
    
}

module.exports = NotionUtils;

/*
 * Copyright (C) 2017 Dolf Dijkstra
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */

const Entities = require('html-entities').AllHtmlEntities

const entities = new Entities()

const worker = (client, contentType, collectionId) => {
  const helper = {
    fieldPrefix: contentType.toLowerCase(),
    addToCollection: response => {
      // add to collection
      let id =
        response.data &&
        response.data.externalFile &&
        response.data.externalFile.fileId
      if (id) {
        return client.addToCollection(id, collectionId)
      } else {
        console.error(response.data)
        throw new Error('Could not create asset')
      }
    },
    createWedoVideoFromItem: item => {
      var data = {
        "wedovideo_name" : item.name,
        "wedovideo_description" : item.description,
        "wedovideo_videourl" : item.videoURL,
        "wedovideo_thumbnail" : item.thumbnail
      };
      return data;
    },
    createWedoVideoFromName: name => {
      var data = {
        wedovideo_name : name,
        wedovideo_description : "description "+ name,
        wedovideo_videourl : "https://example.com/"+name+"/",
        wedovideo_thumbnail : "https://example.com/"+name+"/",
        wedovideo_user : name
      };
      return data;
    },
    createWedoVideoFromId: id => {
      var data = {
        wedovideo_name : "Carlos",
        wedovideo_description : "Updated "+ Date.now(),
        wedovideo_videourl : "https://example.com/"+id+"/video",
        wedovideo_thumbnail : "https://example.com/"+id+"/thumb",
        wedovideo_user : "carlos."+Date.now()
      };
      return data;
    },
    createFieldData: item => {
      return ['videoURL'].reduce((aggr, key) => {
        aggr[helper.fieldPrefix + '_' + 'videoURL'.toLowerCase()] = item[key]
        return aggr
      }, {})
    }
  }
  return {
    inject: item => {
      if (item.videoURL) {
        item.videoURL = item.videoURL.startsWith('//')
          ? 'https:' + item.videoURL
          : item.videoURL
      }
      let data = {
        type: contentType,
        name: entities.decode(item.name.substring(0, 64)),
        description: item.description
          ? entities.decode(item.description.substring(0, 127))
          : undefined,
        data: helper.createWedoVideoFromItem(item)
      }
      console.log("DATA="+JSON.stringify(data));
      return client.createContentItem(data).then(helper.addToCollection)
    },
    create: name => {
      let data = {
        type: contentType,
        name: name,
        description: name,
        data: helper.createWedoVideoFromName(name)
      }
      console.log("DATA="+JSON.stringify(data));
      return client.createContentItem(data).then(helper.addToCollection)
    },
    update: contentId => {
      let data = {
        id: contentId,
        name: "Monte",
        name: "Monte",
        type: contentType,
        data: helper.createWedoVideoFromId(contentId)
      }
      console.log("DATA="+JSON.stringify(data));
      return client.updateContentItem(data)
    },
    lookup: (id, res) => {
      let data = {
        id: id
      }
      console.log("DATA="+JSON.stringify(data));
      return client.getContentItem(data);
    },
    searchUser: user => {
      let data = {
        user: user,
        contentType: contentType
      }
      console.log("DATA="+JSON.stringify(data));
      return client.searchUserContent(data);
    }
  }
}

module.exports = (client, contentType, collectionId) =>
  worker(client, contentType, collectionId)

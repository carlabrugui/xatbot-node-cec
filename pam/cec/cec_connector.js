"use strict"

const log4js = require('log4js');
const logger = log4js.getLogger();
const express = require('express');
const request = require('request');
const urllib = require('urllib');

const invokeFunction = (elementToSearch) => {

    urllib.request(`https://xatbot-node-cec.herokuapp.com/cec/cecAdmin`,
        {   
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            data: {
                "type": "EntradaGlosario",
                "name": elementToSearch.toLowerCase()
                
            }
        }, function (err, data, res) {
            
            if (err) {
                console.log("ERROR---->: ", err);
            } else {
                var buffer = Buffer.from(new Uint8Array(data));

                //let response = new Buffer(data, 'utfdat8');
                var resp = JSON.parse(buffer.toString());
                var name_CEC = resp.body.items[0].name;
                //console.log("id_CEC------------------->", id_CEC);
               
                var url = `https://xatbot-node-cec.herokuapp.com/cec/get-respuesta/${name_CEC}`;

                return datos_lookup(url);
            }
        });
};

const datos_lookup = (url) => new Promise((resolve, reject) => {
    urllib.request(url,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        }, function (err, data) {
            if (err) {
                reject(err);
                console.log("ERROR datos_lookup: ", err);
            } else {
                var respuesta = JSON.parse(data);

                //var entrada_name = (respuesta.body.data.entradaglosario_nombreentrada).toString();
                var entrada_descr = (respuesta.body.data.entradaglosario_textoentrada).toString();
                //var entrada_photo = (respuesta.body.data.entradaglosario_fotoentrada);
                
                //exportar datos para ser usados en la respuesta a DialogFlow
                return entrada_descr; 
            }
        });
});

module.exports = {
    invokeFunction
};
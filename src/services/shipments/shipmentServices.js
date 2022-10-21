import axios from "axios";
import apiConfig from "../../config/api";
import getToken from "../../helper/getToken";

const shipmentServices = {
    getAll: async () => {
        let token = getToken();

        let headers = {
            authorization: "Bearer " + token,
        };

        return await axios.get(apiConfig.url + "/api/shipments/", {
            headers: headers,
        });
    },
    addShipment: async (payload) => {
        let token = getToken();

        let headers = {
            authorization: "Bearer " + token,
        };

        return await axios.post(apiConfig.url + "/api/shipments/add", payload, {
            headers: headers,
        });
    },
    updateDelivery: async(shipment_id) => {
        let token = getToken();

        let headers = {
            authorization: "Bearer " + token
        }

        return await axios.put(apiConfig.url + `/api/shipments/update/${shipment_id}/delivery`, {}, { headers })
    }
};

export default shipmentServices;

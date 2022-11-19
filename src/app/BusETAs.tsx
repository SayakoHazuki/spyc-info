import { Card } from "@mui/material";
import { useState, useEffect } from "react";
import "../resources/styles/BusETAs.c.css";

interface IBusRouteEta {
  route: string;
  destination: string;
  eta: number;
}

const apiBaseUrl = "https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/";
const stops = {
  WCE_SW1: "9D3BCB233237C32C",
  WCE_SW2: "D92BEED0C736EF59",
  WCE_SW3: "7421C8745B4EDF25",
  WCE_NE1: "D85AF13DC2FB0118",
  WCE_NE2: "A23337DAF4A8B168",
  WCE_NE3: "AFC5E64568DBB2D5",
  WCBT1: "9ED89AFC5ACA9A00",
  WCBT2: "9096776C02070F8E",
  LW_SW: "5E70E7D7AB0F41DE",
  LW_NE: "95974C5D780AB509",
};

const BusRouteEta = (props: IBusRouteEta) => {
  /* get from props */
  const route = props.route;
  const destination = props.destination;
  const eta = props.eta;

  return (
    <div className="bus-route-eta ws-item-border">
      <div className="bus-route-eta-route">{route}</div>
      <div className="bus-route-eta-destination">{destination}</div>
      <div className="bus-route-eta-eta">
        {eta <= 120 && eta >= -1 ? (eta + 1).toString().replace(/^0$/g, "-") : "/"}
      </div>
    </div>
  );
};

function getEtaMinutes(eta: Date) {
  const now = new Date();
  const diff = eta.getTime() - now.getTime();
  return Math.floor(diff / 1000 / 60);
}

export const BusETAs = () => {
  const [busETAs, setBusETAs] = useState<IBusRouteEta[]>([]);

  useEffect(() => {
    const fetchAllBusETAs = async () => {
      const fetchBusETAs = async (stop: string) => {
        const response = await fetch(apiBaseUrl + stop);
        /* response template 
      {"type":"StopETA","version":"1.0","generated_timestamp":"2022-11-19T00:21:48+08:00","data":[{"co":"KMB","route":"NA40","dir":"I","service_type":1,"seq":7,"dest_tc":"烏溪沙站","dest_sc":"乌溪沙站","dest_en":"WU KAI SHA STATION","eta_seq":1,"eta":null,"rmk_tc":"","rmk_sc":"","rmk_en":"","data_timestamp":"2022-11-19T00:21:38+08:00"}]}
      */
        const dataJson = await response.json();
        const data = dataJson.data.map((busETA: any) => {
          return {
            route: busETA.route as string,
            destination: busETA.dest_tc as string,
            eta: getEtaMinutes(new Date(busETA.eta) as Date),
          } as IBusRouteEta;
        });
        return data;
      };
      let tempBusETAs = [];
      for (const stop in stops) {
        tempBusETAs.push(await fetchBusETAs(stops[stop as keyof typeof stops]));
      }
      tempBusETAs = tempBusETAs.flat();
      // remove duplicates in tempBusETAs
      tempBusETAs = tempBusETAs
        .filter(
          (busETA, index, self) =>
            index ===
            self.findIndex(
              (t) =>
                t.route === busETA.route && t.destination === busETA.destination
            )
        )
        .sort((a, b) => a.route.localeCompare(b.route));
      setBusETAs(tempBusETAs);
    };
    fetchAllBusETAs();
    setInterval(() => {
      fetchAllBusETAs();
    }, 1000 * 60);
  }, []);

  return (
    <div className="beta-wrapper">
      <Card>
        <div className="ws-card-title">Bus ETAs</div>
        <div className="beta-container">
          {busETAs.map((busETA: IBusRouteEta) => (
            <BusRouteEta
              route={busETA.route}
              destination={busETA.destination}
              eta={busETA.eta}
            ></BusRouteEta>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default BusETAs;

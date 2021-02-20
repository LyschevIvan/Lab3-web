package com.lyschev;

import org.hibernate.Session;
import org.primefaces.shaded.json.JSONObject;

import javax.websocket.OnMessage;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/ajax")
public class WebSocket {

    @OnMessage
    public String onMessage(String message){
        JSONObject obj = new JSONObject(message.trim());
        try{
            float x = obj.getFloat("X");
            float y = obj.getFloat("Y");
            float r = obj.getFloat("R");
            boolean isIn = RecordingPoint.isInZone(x,y,r);
            PointsEntity point = new PointsEntity(x,y,r,isIn);
            Session session = DBSessionProvider.session;
            session.beginTransaction();
            session.save(point);
            session.getTransaction().commit();
            return "success";

        }
        catch (Exception e){
            e.printStackTrace();
            return "Some error occurs";
        }
    }
}

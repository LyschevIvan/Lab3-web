package com.lyschev;


import java.util.ArrayList;
import java.util.List;


public class Points{

    private List<PointsEntity> points;

    public Points() {
        points = new ArrayList<PointsEntity>();
    }

    public List<PointsEntity> getPoints() {
        DBSessionProvider.session.beginTransaction();
        points = DBSessionProvider.session.createQuery("from PointsEntity order by id").list();
        DBSessionProvider.session.getTransaction().commit();
        return points;
    }
    public void deletePoint(PointsEntity point){
        DBSessionProvider.session.beginTransaction();
        DBSessionProvider.session.delete(point);
        DBSessionProvider.session.getTransaction().commit();
    }
    public void setPoints(List<PointsEntity> points) {
        this.points = points;
    }
}

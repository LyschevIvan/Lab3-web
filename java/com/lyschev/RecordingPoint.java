package com.lyschev;

public class RecordingPoint{
    private Float x;
    private Float y;
    private Float r;


    public RecordingPoint() {
        this.r = 1f;
        this.x = 0f;
    }

    public String redirect(){
        return "success";
    }
    public void onSubmit(){
        if(x!= null && y != null && r != null)
        {
            DBSessionProvider.session.beginTransaction();

            PointsEntity point = new PointsEntity(x,y,r,isInZone(x,y,r));
            DBSessionProvider.session.save(point);
            DBSessionProvider.session.getTransaction().commit();

        }

    }

    public Float getX() {
        return x;
    }

    public void setX(Float x) {
        this.x = x;
    }

    public Float getY() {
        return y;
    }

    public void setY(Float y) {
        this.y = y;
    }

    public Float getR() {
        return r;
    }

    public void setR(Float r) {
        this.r = r;
    }


    static boolean isInZone(Float x, Float y, Float r){
        if ((x+r>= y)&&(x<=0)&&(y>=0)){
            return true;
        }
        if((x>=0)&&(x<=r)&&(y<=0)&&(y>=-r)){
            return true;
        }
        if((x>0)&&(y>0)&&(x*x+y*y <= r*r/4d)){
            return true;
        }
        return false;

    }
}

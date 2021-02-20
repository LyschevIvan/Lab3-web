package com.lyschev;


import javax.persistence.*;

@Entity
@Table(name = "POINTS")
public class PointsEntity {
    private Long id;
    private float x;
    private float y;
    private float r;
    private boolean isin;

    public PointsEntity() {
    }

    public PointsEntity(float x, float y, float r, boolean isin) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.isin = isin;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "id_seq")
    @SequenceGenerator(name = "id_seq", sequenceName = "id_seq", allocationSize = 1, initialValue = 1)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public float getX() {
        return x;
    }

    public void setX(float x) {
        this.x = x;
    }


    public float getY() {
        return y;
    }

    public void setY(float y) {
        this.y = y;
    }


    public float getR() {
        return r;
    }

    public void setR(float r) {
        this.r = r;
    }


    public boolean isIsin() {

        return isin;
    }
    public void setIsin(boolean isin) {
        this.isin = isin;
    }




    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        PointsEntity that = (PointsEntity) o;

        if (Float.compare(that.x, x) != 0) return false;
        if (Float.compare(that.y, y) != 0) return false;
        if (Float.compare(that.r, r) != 0) return false;
        if (isin != that.isin) return false;
        if (id != null ? !id.equals(that.id) : that.id != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (x != +0.0f ? Float.floatToIntBits(x) : 0);
        result = 31 * result + (y != +0.0f ? Float.floatToIntBits(y) : 0);
        result = 31 * result + (r != +0.0f ? Float.floatToIntBits(r) : 0);
        result = 31 * result + (isin ? 1 : 0);
        return result;
    }

    @Override
    public String toString() {
        return "PointsEntity{" +
                "id=" + id +
                ", x=" + x +
                ", y=" + y +
                ", r=" + r +
                ", isin=" + isin +
                '}';
    }
}

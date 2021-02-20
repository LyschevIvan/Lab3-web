package com.lyschev;

import org.hibernate.Session;

public class DBSessionProvider {
    static Session session = HibernateSessionFactory.getSessionFactory().openSession();
}

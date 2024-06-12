package com.dsd.reservationsystem.database;

import com.dsd.reservationsystem.models.Appointment;
import com.google.cloud.firestore.CollectionReference;

import java.util.ArrayList;
import java.util.List;

public class AppointmentDb {
  private CollectionReference appointmentCollection;

  public AppointmentDb(Db appointmentDatabase) {
    this.appointmentCollection = appointmentDatabase.collection("appointments");
  }

  public List<Appointment> getInRange() {

    return new ArrayList<Appointment>();
  }


}

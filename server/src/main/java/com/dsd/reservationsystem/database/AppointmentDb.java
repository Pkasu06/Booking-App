package com.dsd.reservationsystem.database;

import com.dsd.reservationsystem.models.Appointment;
import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QuerySnapshot;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class AppointmentDb {
    private CollectionReference appointmentCollection;

    public AppointmentDb(Db appointmentDatabase) {
        this.appointmentCollection = appointmentDatabase.collection("appointments");
    }

    public List<Appointment> getInRange(Instant startDate, Instant endDate) throws ExecutionException, InterruptedException {

        //create date ranges
        startDate = startDate.truncatedTo(ChronoUnit.DAYS);
        endDate = endDate.plus(1, ChronoUnit.DAYS).truncatedTo(ChronoUnit.DAYS);

        //create google timestamps
        Timestamp startDateGoogle = Timestamp.parseTimestamp(startDate.toString());
        Timestamp endDateGoogle = Timestamp.parseTimestamp(endDate.toString());

        //create query
        Query query = this.appointmentCollection.whereGreaterThanOrEqualTo("timestamp", startDateGoogle);

        //send request
        ApiFuture<QuerySnapshot> snapshot = query.get();
        List<Appointment> appointmentList = snapshot.get().toObjects(Appointment.class);


        return appointmentList;


    }


}

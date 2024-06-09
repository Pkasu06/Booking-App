package com.dsd.reservationsystem.service;

import com.dsd.reservationsystem.database.Db;
import com.dsd.reservationsystem.models.Appointment;
import com.dsd.reservationsystem.models.AppointmentPostRequest;
import com.dsd.reservationsystem.models.Customer;
import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.concurrent.ExecutionException;

@Service
public class AppointmentService {
    private final Db database;
    private final EmailService emailService;

    private final CustomerService customerService;

    private final TimeSlotsService timeSlotsService;

    public AppointmentService(Db database, EmailService emailService, CustomerService customerService,
                              TimeSlotsService timeSlotsService) {
        this.database = database;
        this.emailService = emailService;
        this.customerService = customerService;
        this.timeSlotsService = timeSlotsService;
    }

    public Appointment saveAppointment(AppointmentPostRequest appointment) {

        System.out.println("appointment");
        System.out.println(appointment);
        // existing or new customer
        Customer customer;
        String customerEmail = appointment.getCustomerInfo().getEmail();

        //extract customer info and appointment time from post request class
        AppointmentPostRequest.CustomerInfo customerInfo = appointment.getCustomerInfo();
        AppointmentPostRequest.AppointmentTime appointmentTime = appointment.getAppointmentTime();


        // try to find customer info by email
        try {

            // get customer by email
            Optional<Customer> foundCustomer = this.customerService.getCustomerByEmail(customerEmail);

            // no customer found. Make new entry and return it
            if (foundCustomer.isEmpty()) {

                // create new customer from request
                Customer newCustomer = new Customer(customerInfo);


                // create customer in database
                customer = this.customerService.createCustomer(newCustomer);

            } else {

                customer = foundCustomer.get();

            }

        } catch (ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        } catch (Exception e) {
            System.out.println("failed to get customer by email data");
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }


        // create new appointment from request
        // GETTING GOOGLE TIMESTAMP INSTANCE
        Timestamp googleTimestamp = Timestamp.parseTimestamp(appointmentTime.getTimestamp().toString());

        Appointment newAppointment = new Appointment();
        newAppointment.setTimeSlot(appointmentTime.getTimeSlot());
        newAppointment.setDate(appointmentTime.getDate());
        newAppointment.setServiceId(customerInfo.getServiceId());
        newAppointment.setConfirmationNumber(UUID.randomUUID().toString());
        newAppointment.setCustomerId(customer.getId());
        newAppointment.setTimestamp(googleTimestamp);


        //save appointment in collection
        try {

            System.out.println("saving appointment to collection");
            createAppointment(newAppointment);
        } catch (ExecutionException e) {
            System.err.println("failed to save appointment into collection");
            throw new RuntimeException(e);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        // update appointments on customer
        customer.addAppointment(newAppointment);

        // update customerInfo database with customer changes
        try {
            CollectionReference customersCollection = database.collection("customerInfo");

            customersCollection.document(customer.getId()).set(customer);

        } catch (Exception e) {
            System.out.println("failed to update customerInfo data");
            throw new RuntimeException("failed to update customerInfo data");
        }

        // update timeSlots database
        try {

            String date = newAppointment.getDate();

            // update timeslots with customer id
            timeSlotsService.updateDayTimeslot(customer.getId(), date, appointmentTime.getTimeSlot());

        } catch (Exception e) {
            System.out.println("failed to update timeslots data");
            System.out.println(appointment);
            System.out.println(e.getMessage());
            throw new RuntimeException("failed to update timeslots data");
        }

        return newAppointment;
    }

    //create entry into database and returns the document id
    public void createAppointment(Appointment appointment) throws ExecutionException, InterruptedException {
        DocumentReference docRef = database.collection("appointments").document();
//        String newId = docRef.getId();
//        System.out.println("new doc id");
//        System.out.println(newId);
        ApiFuture<WriteResult> resultApiFuture = docRef.set(appointment);
        resultApiFuture.get();
    }

//    public Appointment addAppointmentToCustomer(String customerId, Appointment appointment) {
//        // Fetch the customer by ID
//        Customer customer = database.getCustomerById(customerId);
//        if (customer != null) {
//            // Add the new appointment to the customer's list of appointments
//            List<Appointment> appointments = customer.getAppointments();
//            appointments.add(appointment);
//            customer.setAppointments(appointments);
//
//            // Save the customer back to the database
//            database.createCustomer(customer);
//
//            // Add the appointment as a time slot for the given date
//            DaySchedule daySchedule;
//            try {
//                daySchedule = database.getTimeSlotsForDay(appointment.getDate());
//            } catch (Exception e) {
//                e.printStackTrace();
//                return null;
//            }
//            daySchedule.appointments().put(appointment.getTimeSlot(), appointment);
//            database.updateTimeSlotsForDay(appointment.getDate(), daySchedule.appointments());
//
//            return appointment;
//        } else {
//            return null;
//        }
//    }

    //get the appointments for day or return empty list if none found
    public List<HashMap<String, Object>> getAppointmentsForDay(String date)
            throws Exception {

        List<HashMap<String, Object>> appointmentsList = new ArrayList<>();

        Map<String, Object> daysTimeSlots;

        try {
            //get data from database
            daysTimeSlots = database.getAppointmentsForDay(date);

        } catch (Exception e) {
            System.out.println("failed to get appointments for day");
            System.out.printf(e.getMessage());
            throw new Exception("DataBase failed to get appointment for day" + date);
        }
        // call database for days appointments

        // create appointment structures
        // loop through hash map of day timeslots and add appointments to list to
        // display appointments for this day
        for (Map.Entry<String, Object> timeSlot : daysTimeSlots.entrySet()) {
            HashMap<String, Object> customerAppointment = new HashMap<>();
            String tsCode = timeSlot.getKey();
            HashMap<String, String> timeSlotData = (HashMap<String, String>) timeSlot.getValue();

            String customerId = timeSlotData.get("customerId");

            // todo get customer info
            Customer customer = customerService.getCustomerById(customerId);

            customerAppointment.put("name", customer.getName());

            // search customers appointments for matching date and timeslot
            for (Appointment custAppt : customer.getAppointments()) {

                if ((date.equals(custAppt.getDate())) && tsCode.equals(custAppt.getTimeSlot())) {

                    customerAppointment.put("time", custAppt.getTimeSlot());
                    customerAppointment.put("serviceId", custAppt.getServiceId());

                }
            }

            appointmentsList.add(customerAppointment);

        }

        return appointmentsList;
    }


    public List<Appointment> getAppointmentsForDay(Instant date)
            throws Exception {
        CollectionReference appointmentsCollection = database.collection("appointments");

        //create date ranges
        Instant startDate = date.truncatedTo(ChronoUnit.DAYS);
        Instant endDate = date.plus(1, ChronoUnit.DAYS).truncatedTo(ChronoUnit.DAYS);

        //create google timestamps
        Timestamp startDateGoogle = Timestamp.parseTimestamp(startDate.toString());
        Timestamp endDateGoogle = Timestamp.parseTimestamp(endDate.toString());

        //create query
        Query query = appointmentsCollection.whereGreaterThanOrEqualTo("timestamp", startDateGoogle).whereLessThan("timestamp", endDateGoogle);

        //send request
        ApiFuture<QuerySnapshot> snapshot = query.get();
        List<Appointment> appointmentList = snapshot.get().toObjects(Appointment.class);

        return appointmentList;
    }
}

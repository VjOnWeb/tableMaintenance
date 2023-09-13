package demo.vijayworks.tableMaintenance;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
public class CustomerController {
    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping
    public Customer createCustomer(@RequestBody Customer customer) {
        return customerService.createCustomer(customer);
    }

    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @PutMapping()
    public Customer updateCustomer(@RequestBody Customer customer) {
        return customerService.updateCustomer(customer);
    }

    @DeleteMapping("/{customerID}")
    public void deleteCustomer(@PathVariable Long customerID) {
        customerService.deleteCustomer(customerID);
    }


@PutMapping("/{customerID}")
public Customer updateCustomer(@PathVariable Long customerID, @RequestBody Customer customer) {
    Customer existingCustomer = customerService.getCustomerByID(customerID);
    System.out.println(existingCustomer);
    if (existingCustomer == null) {
        // Handle not found scenario
    }

    existingCustomer.setFirstName(customer.getFirstName());
    existingCustomer.setLastName(customer.getLastName());
    existingCustomer.setEmail(customer.getEmail());
    existingCustomer.setPhone(customer.getPhone());

    return customerService.updateCustomer(existingCustomer);
}
}

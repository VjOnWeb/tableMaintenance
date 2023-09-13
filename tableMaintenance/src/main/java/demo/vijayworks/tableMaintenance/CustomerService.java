package demo.vijayworks.tableMaintenance;

import java.util.List;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
	private final CustomerRepository customerRepository;

	@Autowired
	public CustomerService(CustomerRepository customerRepository) {
		this.customerRepository = customerRepository;
	}

	public Customer createCustomer(Customer customer) {
		return customerRepository.save(customer);
	}

	public List<Customer> getAllCustomers() {
		return customerRepository.findAll();
	}

	public Customer updateCustomer(Customer customer) {
		return customerRepository.save(customer);
	}

	public void deleteCustomer(Long customerID) {
		customerRepository.deleteById(customerID);
	}

	public Customer getCustomerByID(Long customerID) {
		Optional<Customer> customerOptional = customerRepository.findById(customerID);
		return customerOptional.orElse(null); // Return null if customer is not found
	}
}

// Java example with various issues for Yoda to catch

import java.util.*;

// Class name should be descriptive
public class Example {
    
    // Public field instead of private with getter/setter
    public String name;
    public int age;
    
    // Missing final keyword for immutable variables
    public static String CONSTANT_VALUE = "constant";
    
    // Constructor without proper validation
    public Example(String name, int age) {
        this.name = name;  // No null check
        this.age = age;    // No validation
    }
    
    // Using String concatenation in loop instead of StringBuilder
    public String generateReport(List<String> items) {
        String result = "";
        for (String item : items) {
            result += item + "\n";  // Should use StringBuilder
        }
        return result;
    }
    
    // Missing @Override annotation
    public String toString() {
        return name + " (" + age + ")";
    }
    
    // Not using generics properly
    public List getItems() {  // Should specify generic type
        return new ArrayList();
    }
    
    // Poor exception handling - catching generic Exception
    public void readFile(String filename) {
        try {
            // File reading code here
            throw new Exception("Test");
        } catch (Exception e) {  // Should catch specific exceptions
            e.printStackTrace();  // Should use proper logging
        }
    }
    
    // Not closing resources properly
    public String readFromFile(String filename) {
        try {
            Scanner scanner = new Scanner(new File(filename));
            return scanner.nextLine();  // Scanner not closed
        } catch (Exception e) {
            return null;
        }
    }
    
    // Missing equals() and hashCode() implementations
    // Class has fields but no proper equals/hashCode
    
    // Static method that could be instance method
    public static void printInfo(Example example) {
        System.out.println(example.toString());  // Could be instance method
    }
    
    // Method with too many parameters
    public void updateUser(String firstName, String lastName, String email, 
                          String phone, String address, int age, boolean active,
                          String department, String role, Date createdDate) {
        // Should use a parameter object
    }
    
    // Using primitive wrapper when primitive would suffice
    public Integer calculate(Integer a, Integer b) {
        return a + b;  // Could use int instead of Integer
    }
    
    // Magic numbers
    public boolean isValid() {
        return age >= 18 && age <= 65;  // Should use constants
    }
} 
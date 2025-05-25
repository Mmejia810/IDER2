package xyz.app.ider;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class IderAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(IderAppApplication.class, args);
	}

}

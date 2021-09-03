package com.pro.suppro.system;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
@SpringBootApplication
@EnableScheduling
public class SocialMediaAgentApplication {

	public static void main(String[] args) {
		SpringApplication.run(SocialMediaAgentApplication.class, args);
	}

}

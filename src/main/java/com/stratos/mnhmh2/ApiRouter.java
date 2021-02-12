package com.stratos.mnhmh2;

import java.util.concurrent.atomic.AtomicLong;

import com.stratos.mnhmh2.api.Greeting;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiRouter {

	private static final String template = "Hellosssss, %s!";
	private final AtomicLong counter = new AtomicLong();

	@GetMapping("/api/greeting")
	public Greeting greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
		return new Greeting(counter.incrementAndGet(), String.format(template, name));
	}
}
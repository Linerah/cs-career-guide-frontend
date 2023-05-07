from locust import HttpUser, task, between

class QuickstartUser(HttpUser):
    wait_time = between(1, 2)

    def on_start(self):
        self.client.get("/auth", json={"email": "fernando.ramos9@upr.edu", "password": "apassword"})

        #self.client.post("/auth", json={"email": "fernando.ramos9@upr.edu", "password": "apassword"})

    @task
    def main(self):
        self.client.get("/main")
        self.client.get("/quiz")

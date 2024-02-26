import React from "react";
import { Container, Col, Accordion, Card, Button } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";

const PopularProfiles = ({ mobile }) => {
  // Access popular profiles data from the context
  const { popularProfiles } = useProfileData();

  return (
    <Container className={`${appStyles.Content} ${mobile ? "d-lg-none text-center mb-3" : ""}`}>
      {popularProfiles.results.length ? (
        <>
          <p className="text-center">Most followed profiles.</p>
          {mobile ? (
            // Render an accordion for mobile view
            <Accordion>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Show Most Followed Profiles
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Col>
                      {popularProfiles.results.slice(0, 6).map((profile) => (
                        // Render profiles for mobile view
                        <Profile key={profile.id} profile={profile} mobile />
                      ))}
                    </Col>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          ) : (
            // Render profiles for desktop view
            popularProfiles.results.map((profile) => (
              <Profile key={profile.id} profile={profile} />
            ))
          )}
        </>
      ) : (
        // Render a spinner if no popular profiles found
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularProfiles;

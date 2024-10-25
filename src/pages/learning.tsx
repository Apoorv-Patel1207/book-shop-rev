import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import Layout from "../components/layout/layout";

function Learning() {
  const challenges = [
    {
      title: "React & TypeScript Integration",
      description:
        "Integrating TypeScript into a React project required careful type definitions for props, states, and API calls. This helped improve the overall code quality and reduced runtime errors.",
    },
    {
      title: "Using ShadCN UI with Tailwind CSS",
      description:
        "Customizing UI components with ShadCN UI and Tailwind CSS for a responsive and modern design was challenging but allowed for a highly scalable design system.",
    },
    {
      title: "Price Slider and Search Feature Implementation",
      description:
        "Implementing a price slider (0 - 9999) and a custom search feature required managing state effectively with React hooks and improving performance with debounce techniques.",
    },
    {
      title: "User Authentication with Auth0",
      description:
        "Implementing secure authentication using Auth0, including login, sign-up, and token-based access, was a significant challenge but crucial for secure user sessions.",
    },
    {
      title: "Backend with Node.js and PostgreSQL",
      description:
        "Setting up the backend with Node.js and PostgreSQL, designing database schemas, and integrating the frontend with the API for book data and orders provided valuable experience in full-stack development.",
    },
   
   
  ];

  return (
    <Layout>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Challenges and Learning from Bookstore App Development
        </Typography>
        <Typography variant="body1" gutterBottom>
          During the development of the online bookstore application, I faced
          several challenges that helped me develop key skills in frontend and
          full-stack development. Below are the main challenges and the skills I
          acquired:
        </Typography>
        <List>
          {challenges.map((challenge, index) => (
            <ListItem key={index} sx={{ paddingBottom: 2 }}>
              <ListItemText
                primary={
                  <Typography variant="h6">{challenge.title}</Typography>
                }
                secondary={challenge.description}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Layout>
  );
}

export default Learning;

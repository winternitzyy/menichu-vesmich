import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Public pages
import Home from "./pages/Home";
import ComingEvents from "./pages/ComingEvents";
import PastEvents from "./pages/PastEvents";
import BookPage from "./pages/BookPage";
import Donate from "./pages/Donate";
import DonateThankYou from "./pages/DonateThankYou";

// Feedback modal
import FeedbackModal from "./components/FeedbackModal";

// On GitHub Pages the site may live under a sub-path (e.g. /menichu-vesmich/).
const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, "");

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/coming-events" component={ComingEvents} />
      <Route path="/past-events" component={PastEvents} />
      <Route path="/book" component={BookPage} />
      <Route path="/donate" component={Donate} />
      <Route path="/donate/thank-you" component={DonateThankYou} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <WouterRouter base={BASE_PATH}>
            <Router />
          </WouterRouter>
          <FeedbackModal />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

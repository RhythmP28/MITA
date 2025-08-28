import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Solve from "./pages/Solve";
import Puzzles from "./pages/Puzzles";
import Learn from "./pages/Learn";
import Compete from "./pages/Compete";
import Leaderboard from "./pages/Leaderboard";
import Social from "./pages/Social";
import More from "./pages/More";
// Play dropdown pages
import Daily from "./pages/Daily";
import Quick from "./pages/Quick";
import Timed from "./pages/Timed";
import Practice from "./pages/Practice";
// Puzzles dropdown pages
import PuzzlesDaily from "./pages/puzzles/Daily";
import PuzzlesRush from "./pages/puzzles/Rush";
import PuzzlesBattle from "./pages/puzzles/Battle";
import PuzzlesBlind from "./pages/puzzles/Blind";
// Learn dropdown pages
import LearnTopics from "./pages/learn/Topics";
import LearnRecent from "./pages/learn/Recent";
import LearnFavorites from "./pages/learn/Favorites";
import LearnSuggested from "./pages/learn/Suggested";
// Compete dropdown pages
import CompeteRanked from "./pages/compete/Ranked";
import CompeteArena from "./pages/compete/Arena";
import CompeteCustom from "./pages/compete/Custom";
import CompeteTournaments from "./pages/compete/Tournaments";
// Leaderboard dropdown pages
import LeaderboardGlobal from "./pages/leaderboard/Global";
import LeaderboardFriends from "./pages/leaderboard/Friends";
import LeaderboardCountry from "./pages/leaderboard/Country";
import LeaderboardTopics from "./pages/leaderboard/Topics";
// Social dropdown pages
import SocialFeed from "./pages/social/Feed";
import SocialFriends from "./pages/social/Friends";
import SocialDiscover from "./pages/social/Discover";
import SocialNotifications from "./pages/social/Notifications";

export default function App() {
    return (
        <div className="flex min-h-screen bg-black text-offwhite font-serif">
            <Sidebar />
            <main className="flex-1 ml-20 md:ml-64 p-4 md:p-8">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/solve" element={<Solve />} />
                    <Route path="/puzzles" element={<Puzzles />} />
                    <Route path="/learn" element={<Learn />} />
                    <Route path="/compete" element={<Compete />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/social" element={<Social />} />
                    <Route path="/more" element={<More />} />
                    {/* Play dropdown routes */}
                    <Route path="/daily" element={<Daily />} />
                    <Route path="/quick" element={<Quick />} />
                    <Route path="/timed" element={<Timed />} />
                    <Route path="/practice" element={<Practice />} />
                    {/* Puzzles dropdown routes */}
                    <Route path="/puzzles/daily" element={<PuzzlesDaily />} />
                    <Route path="/puzzles/rush" element={<PuzzlesRush />} />
                    <Route path="/puzzles/battle" element={<PuzzlesBattle />} />
                    <Route path="/puzzles/blind" element={<PuzzlesBlind />} />
                    {/* Learn dropdown routes */}
                    <Route path="/learn/topics" element={<LearnTopics />} />
                    <Route path="/learn/recent" element={<LearnRecent />} />
                    <Route path="/learn/favorites" element={<LearnFavorites />} />
                    <Route path="/learn/suggested" element={<LearnSuggested />} />
                    {/* Compete dropdown routes */}
                    <Route path="/compete/ranked" element={<CompeteRanked />} />
                    <Route path="/compete/arena" element={<CompeteArena />} />
                    <Route path="/compete/custom" element={<CompeteCustom />} />
                    <Route path="/compete/tournaments" element={<CompeteTournaments />} />
                    {/* Leaderboard dropdown routes */}
                    <Route path="/leaderboard/global" element={<LeaderboardGlobal />} />
                    <Route path="/leaderboard/friends" element={<LeaderboardFriends />} />
                    <Route path="/leaderboard/country" element={<LeaderboardCountry />} />
                    <Route path="/leaderboard/topics" element={<LeaderboardTopics />} />
                    {/* Social dropdown routes */}
                    <Route path="/social/feed" element={<SocialFeed />} />
                    <Route path="/social/friends" element={<SocialFriends />} />
                    <Route path="/social/discover" element={<SocialDiscover />} />
                    <Route path="/social/notifications" element={<SocialNotifications />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
        </div>
    );
}



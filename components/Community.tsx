
import React from 'react';

const FeatureListItem: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-amber-500/10 rounded-full text-amber-400">
            {icon}
        </div>
        <div>
            <h4 className="text-lg font-bold text-white">{title}</h4>
            <p className="text-gray-400">{description}</p>
        </div>
    </div>
);

const ShareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>;
const MessageSquareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>;
const TrophyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>;


export const Community: React.FC = () => {
    return (
        <section id="community" className="py-20 bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold">Our Virtual Community</h2>
                    <p className="text-lg text-gray-400 mt-2 max-w-3xl mx-auto">
                        Art is enriched when shared. Soon, you will connect with other students.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto grid md:grid-cols-1 gap-10">
                    <FeatureListItem
                        icon={<ShareIcon />}
                        title="Share Your Progress"
                        description="Upload recordings of your practice or images of your art and receive constructive feedback from your peers and Maestre Arco."
                    />
                    <FeatureListItem
                        icon={<MessageSquareIcon />}
                        title="Discussion Forums"
                        description="Stuck on a technique? Ask the community in forums moderated by AI to ensure a safe and helpful learning environment."
                    />
                    <FeatureListItem
                        icon={<TrophyIcon />}
                        title="Artistic Challenges"
                        description="Participate in weekly and monthly creative challenges to test your skills, explore new styles, and grow as an artist."
                    />
                </div>
            </div>
        </section>
    );
};

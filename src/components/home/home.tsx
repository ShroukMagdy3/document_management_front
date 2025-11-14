import React from "react";
import { Upload, Folder, Shield, Cloud, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="flex w-full">
        <div className="hidden lg:block w-40"></div>
        <div className="flex-1 flex flex-col items-center px-4">
          <section className="text-center py-20">
            <h1 className="text-6xl font-signature text-amber-400 mb-6">
              Keeply.
            </h1>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto mb-6">
              keeply is your ultimate secure cloud storage platform. Upload,
              organize, and access all your documents, videos, audio files, and
              images anytime, anywhere. Experience seamless file management and
              ensure your data is safe and always accessible.
            </p>
            <p className="text-gray-400 max-w-3xl mx-auto mb-8">
              Whether you're a professional managing important work files, a
              student storing lecture notes, or someone who just wants to keep
              memories safe, Keeply makes it easy. Our intuitive interface,
              lightning-fast uploads, and secure storage ensure peace of mind
              and efficiency.
            </p>
            <Link
              to="/workspace"
              className="bg-amber-500 hover:bg-amber-600 px-10 py-4 rounded-full font-semibold transition inline-block text-center"
            >
              Upload Your First File
            </Link>
          </section>

          <section className="grid md:grid-cols-3 gap-8 py-16 w-full max-w-6xl mx-auto">
            <FeatureCard
              icon={<Upload size={48} />}
              title="Upload Files"
              description="Upload PDFs, videos, audio, and images with ease and security."
            />
            <FeatureCard
              icon={<Folder size={48} />}
              title="Organize Documents"
              description="Create folders, categorize your files, and find them quickly when needed."
            />
            <FeatureCard
              icon={<Shield size={48} />}
              title="Safe & Secure"
              description="Your files are protected with top-level encryption and secure access controls."
            />
          </section>

          <section className="bg-gray-800 w-full py-16 p-3 rounded-2xl">
            <h2 className="text-3xl text-center text-amber-400 font-bold mb-10">
              Quick Actions
            </h2>
            <div className="grid md:grid-cols-3 gap-8 py-16 w-full max-w-6xl mx-auto">
              <ActionCard
                icon={<Upload size={36} />}
                label="Upload File"
                description="Easily upload PDFs, videos, audio, and images securely."
              />

              <ActionCard
                icon={<Cloud size={36} />}
                label="Access Anywhere"
                description="Your files are available anywhere, anytime."
              />

              <ActionCard
                icon={<Shield size={36} />}
                label="Secure Storage"
                description="All files are safely stored with top-level encryption."
              />
            </div>
          </section>
          <section className="py-16 w-full max-w-6xl mx-auto">
            <h2 className="text-4xl text-amber-400 font-bold text-center mb-10">
              Our Features in Action
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-6 rounded-2xl transform hover:-translate-y-2 hover:scale-105  transition-all shadow-lg">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Fast Uploads
                </h3>
                <p className="text-gray-400 text-sm">
                  Upload files in seconds with our lightning-fast cloud
                  infrastructure.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-2xl transform hover:-translate-y-2 hover:scale-105 transition-all shadow-lg">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Easy Organization
                </h3>
                <p className="text-gray-400 text-sm">
                  Organize your documents, videos, audio, and images
                  efficiently.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-2xl transform hover:-translate-y-2 hover:scale-105 transition-all shadow-lg">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Secure Access
                </h3>
                <p className="text-gray-400 text-sm">
                  Keep your files protected and accessible only to authorized
                  users.
                </p>
              </div>
            </div>
          </section>

          <section className="py-16 max-w-4xl text-center">
            <h2 className="text-4xl text-amber-400 font-bold mb-6">
              Why Choose <span className="font-signature">Keeply.</span>?
            </h2>
            <p className="text-gray-400 mb-4">
              Keeply combines simplicity, speed, and security in one platform.
              No more messy drives or lost files. Everything you upload is
              instantly organized and backed up in the cloud.
            </p>
            <p className="text-gray-400">
              From small personal projects to large professional workloads,
              Keeply adapts to your needs. Enjoy easy file sharing, folder
              management, and preview features, all in one place.
            </p>
          </section>

          <footer className="w-full bg-gray-900 py-10 flex flex-col items-center gap-4">
            <p className="text-gray-400">Contact us on social media</p>
            <div className="flex gap-6 text-amber-400">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={24} />
              </a>
            </div>
            <p className="text-gray-500 mt-4">
              &copy; {new Date().getFullYear()} Keeply
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-gray-800 p-8 rounded-xl hover:scale-105 hover:shadow-xl transition cursor-pointer text-center transform">
      <div className="text-amber-400 mx-auto mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mt-2 mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

function ActionCard({
  icon,
  label,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
}) {
  return (
    <div className="bg-gray-700 p-6 rounded-2xl hover:scale-105 hover:shadow-lg transition cursor-pointer flex flex-col items-center gap-3 text-center transform">
      <div className="text-amber-400 mb-2">{icon}</div>
      <h3 className="text-lg font-semibold text-white">{label}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}

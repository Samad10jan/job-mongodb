"use client";
import { EnvelopeClosedIcon, GitHubLogoIcon, GlobeIcon, LinkedInLogoIcon, MagnifyingGlassIcon, PersonIcon, QuestionMarkCircledIcon, RocketIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Flex, IconButton, Separator, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useContext } from "react";
import { ThContext } from "../context/theme-context";
import { UserContext } from "../context/user-context";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { user } = useContext(UserContext);
  const { isDark } = useContext(ThContext);

  return (
    <footer
      className={`${isDark ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800 "
        }`}
    >
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Flex
          direction={{ initial: "column", lg: "row" }}
          justify="between"
          wrap="wrap"
          gap="8"
        >
          
          <Flex direction="column" gap="4" className="max-w-sm flex-1">
            <Text size="5" weight="bold">
              HireStack
            </Text>
            <Text
              size="2"
              color="gray"
              className={`leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"
                }`}
            >
              Connecting talented professionals with innovative companies. Build
              your career stack with the opportunities that matter.
            </Text>
            <Flex gap="3">
              <Link href="https://twitter.com/hirestack">
                <IconButton
                  variant="soft"
                  color={isDark ? "gray" : "gray"}
                  radius="full"
                  size="2"
                  className="hover:!bg-emerald-600" 
                >
                  <TwitterLogoIcon />
                </IconButton>
              </Link>
              <Link href="https://linkedin.com/company/hirestack">
                <IconButton
                  variant="soft"
                  color="gray"
                  radius="full"
                  size="2"
                  className="hover:!bg-emerald-600"
                >
                  <LinkedInLogoIcon/>
                </IconButton>
              </Link>
              <Link href="https://github.com/hirestack">
                <IconButton
                  variant="soft"
                  color="gray"
                  radius="full"
                  size="2"
                  className="hover:!bg-emerald-600"
                >
                  <GitHubLogoIcon  />
                </IconButton>
              </Link>
              <Link href="mailto:hello@hirestack.com">
                <IconButton
                  variant="soft"
                  color="gray"
                  radius="full"
                  size="2"
                  className="hover:!bg-emerald-600"
                >
                  <EnvelopeClosedIcon  />
                </IconButton>
              </Link>
            </Flex>
          </Flex>

          
          <Flex direction="column" gap="3" className="min-w-[200px] flex-1">
            <Text size="3" weight="medium">
              For Job Seekers
            </Text>
            <Link
              href="/#jobs"
              className={`flex items-center gap-2 text-sm ${isDark
                  ? "text-gray-400 hover:text-emerald-400"
                  : "text-gray-600 hover:text-emerald-600"
                }`}
            >
              <MagnifyingGlassIcon /> Browse Jobs
            </Link>
            <Link
              href={"/userprofile/"}
              className={`flex items-center gap-2 text-sm ${isDark
                  ? "text-gray-400 hover:text-emerald-400"
                  : "text-gray-600 hover:text-emerald-600"
                }`}
            >
              <PersonIcon /> Edit Profile
            </Link>
            
            <Link
              href="/salary-guide"
              className={`flex items-center gap-2 text-sm ${isDark
                  ? "text-gray-400 hover:text-emerald-400"
                  : "text-gray-600 hover:text-emerald-600"
                }`}
            >
              <GlobeIcon /> Salary Guide
            </Link>
          </Flex>

         
          
          { user?.role==="recruiter"&&

            <Flex direction="column" gap="3" className="min-w-[200px] flex-1">
            <Text size="3" weight="medium">
              For Employers
            </Text>
            <Link
              href="/add-job"
              className={`flex items-center gap-2 text-sm ${isDark
                ? "text-gray-400 hover:text-emerald-400"
                : "text-gray-600 hover:text-emerald-600"
                }`}
                >
              <RocketIcon /> Post a Job
            </Link>
            <Link
              href="/talent-search"
              className={`flex items-center gap-2 text-sm ${isDark
                ? "text-gray-400 hover:text-emerald-400"
                : "text-gray-600 hover:text-emerald-600"
                }`}
                >
              <MagnifyingGlassIcon /> Search Talent
            </Link>
            <Link
              href="/analytics"
              className={`flex items-center gap-2 text-sm ${isDark
                ? "text-gray-400 hover:text-emerald-400"
                : "text-gray-600 hover:text-emerald-600"
                }`}
                >
              <GlobeIcon /> Hiring Analytics
            </Link>
          </Flex>
            }

  
          <Flex direction="column" gap="3" className="min-w-[200px] flex-1">
            <Text size="3" weight="medium">
              Company
            </Text>
            <Link
              href="/about"
              className={`flex items-center gap-2 text-sm ${isDark
                  ? "text-gray-400 hover:text-emerald-400"
                  : "text-gray-600 hover:text-emerald-600"
                }`}
            >
              About Us
            </Link>
            <Link
              href="/#contact"
              className={`flex items-center gap-2 text-sm ${isDark
                  ? "text-gray-400 hover:text-emerald-400"
                  : "text-gray-600 hover:text-emerald-600"
                }`}
            >
              Contact
            </Link>
           
            {/* <Link
              href="/help"
              className={`flex items-center gap-2 text-sm ${isDark
                  ? "text-gray-400 hover:text-emerald-400"
                  : "text-gray-600 hover:text-emerald-600"
                }`}
            >
              <QuestionMarkCircledIcon /> Help Center
            </Link>
            <Link
              href="/api"
              className={`flex items-center gap-2 text-sm ${isDark
                  ? "text-gray-400 hover:text-emerald-400"
                  : "text-gray-600 hover:text-emerald-600"
                }`}
            >
              API Documentation
            </Link> */}
          </Flex>
        </Flex>
      </div>

      <Separator
        size="4"
        className={isDark ? "bg-gray-800" : "bg-gray-300"}
      />

    
      <div className={isDark ? "bg-gray-950" : "bg-gray-200"}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Flex
            direction={{ initial: "column", sm: "row" }}
            justify="between"
            align="center"
            gap="4"
          >
            <Text
              size="2"
              className={isDark ? "text-gray-400" : "text-gray-600"}
            >
              © {currentYear} HireStack. All rights reserved.
            </Text>
            <Flex gap="6" wrap="wrap">
              <Link
                href="/privacy"
                className={`text-sm ${isDark
                    ? "text-gray-400 hover:text-emerald-400"
                    : "text-gray-600 hover:text-emerald-600"
                  }`}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className={`text-sm ${isDark
                    ? "text-gray-400 hover:text-emerald-400"
                    : "text-gray-600 hover:text-emerald-600"
                  }`}
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className={`text-sm ${isDark
                    ? "text-gray-400 hover:text-emerald-400"
                    : "text-gray-600 hover:text-emerald-600"
                  }`}
              >
                Cookie Policy
              </Link>
            </Flex>
          </Flex>
        </div>
      </div>
    </footer>
  );
}

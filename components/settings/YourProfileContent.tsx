import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Container from "@/components/Container";
import { ArrowLineUpRight } from "@phosphor-icons/react/dist/ssr";
import { useAtom } from "jotai";
import { accountStore } from "@/stores/account";
import { MYKREATIVE_URL } from "@/lib/constants";

interface YourProfileContentProps {
  userTitle: string;
  speciesServed: string;
}

export default function YourProfileContent() {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [account] = useAtom(accountStore);
  const [profile, setProfile] = useState<YourProfileContentProps>({
    userTitle: "",
    speciesServed: "Small animal",
  });

  return (
    <Container>
      {/* <div className="">
        <h2 className="text-2xl font-bold tracking-tight pb-3">Your profile</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1">
            {isPending ? <ChangeTitleSkeleton /> : null}
            {isSuccess ? (
              <div>
                <p className="text-brand-primary">Job Title / Position</p>
                <Select
                  onValueChange={(value) => {
                    setProfile((prev) => ({
                      ...prev,
                      userTitle: value,
                    }));
                  }}
                  value={profile.userTitle}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="What best describes you?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Veterinarian">Veterinarian</SelectItem>
                    <SelectItem value="Veterinary Assistant">
                      Veterinary Assistant
                    </SelectItem>
                    <SelectItem value="Practice Manager">
                      Practice Manager
                    </SelectItem>
                    <SelectItem value="Veterinary Technician Specialist (VTS)">
                      Veterinary Technician Specialist (VTS)
                    </SelectItem>
                    <SelectItem value="Receptionist">Receptionist</SelectItem>
                    <SelectItem value="Veterinary Surgeon">
                      Veterinary Surgeon
                    </SelectItem>
                    <SelectItem value="Veterinary Nurse">
                      Veterinary Nurse
                    </SelectItem>
                    <SelectItem value="Animal Care Attendant">
                      Animal Care Attendant
                    </SelectItem>
                    <SelectItem value="Veterinary Practice Owner">
                      Veterinary Practice Owner
                    </SelectItem>
                    <SelectItem value="Veterinary Pharmacist">
                      Veterinary Pharmacist
                    </SelectItem>
                    <SelectItem value="Equine Veterinary Technician">
                      Equine Veterinary Technician
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : null}
          </div>
          <div className="col-span-2 sm:col-span-1">
            {isPending ? <ChangeTitleSkeleton /> : null}
            {isSuccess ? (
              <div>
                <p className="text-brand-primary">Species that you help</p>
                <Select
                  onValueChange={(value) => {
                    setProfile((prev) => ({
                      ...prev,
                      speciesServed: value,
                    }));
                  }}
                  value={profile.speciesServed}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="What kind of animals do you help?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Small animal">Small animal</SelectItem>
                    <SelectItem value="Large animal">Large animal</SelectItem>
                    <SelectItem value="Small and Large animal">
                      Small and Large animal
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : null}
          </div>
          <div className="flex justify-start mt-4">
            <Button type="submit" animated onClick={() => mutate()}>
              Update profile
            </Button>
          </div>
        </div>
      </div> */}
      <div className="grid grid-cols-2">
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-2xl font-bold tracking-tight pb-2">
            Account details
          </h2>
          <p className="text-md text-neutrals-10 mb-6">
            You can update your name, email, password, and avatar on your
            account with MyKreative.
          </p>
          <div className="flex justify-start">
            <Button
              className="flex items-center space-x-2"
              onClick={(e: any) => {
                e.preventDefault();
                router.push(MYKREATIVE_URL);
              }}
              animated
            >
              <span>Go to MyKreative</span>
              <ArrowLineUpRight weight="bold" className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1 flex justify-center sm:justify-end pt-8 sm:pt-3">
          <svg
            className="h-7 w-auto"
            viewBox="0 0 113 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.85" clipPath="url(#clip0_590_642)">
              <path
                d="M51.0858 9.0402L54.0809 5.78346V5.64593H51.5375L49.1928 8.25834V2.07083L47.1582 0.891033V12.8347H49.1928V9.89285L51.6089 12.8347H54.2368V12.6972L51.0858 9.0402ZM54.5121 12.8347H56.5461V9.28773C56.5461 8.13251 57.2107 7.45894 58.2417 7.45894H58.9483L59.4919 5.52068H58.4398C57.4932 5.52068 56.8694 6.05675 56.5461 6.69111H56.4899L56.3204 5.64593H54.5121V12.8347ZM62.7436 12.9582C64.7639 12.9582 65.9361 11.8176 66.1342 10.5249H64.0276C63.9006 10.855 63.5474 11.24 62.7424 11.24C61.7536 11.24 61.3159 10.6489 61.3013 9.81032H66.2314V9.02674C66.2314 7.07445 64.9602 5.52068 62.7002 5.52068C60.298 5.52068 59.0836 7.21137 59.0836 9.24618C59.0848 11.3085 60.4128 12.9582 62.7436 12.9582ZM61.3171 8.47545C61.3593 7.78782 61.7688 7.25177 62.7014 7.25177C63.5631 7.25177 63.9696 7.78782 64.0148 8.47545H61.3171ZM68.9547 12.9582C69.8727 12.9582 70.5251 12.6422 70.9322 12.1887H70.989V12.7522L73.0938 12.8347V8.10502C73.0938 6.60686 71.8793 5.52068 69.859 5.52068C67.6846 5.52068 66.6801 6.97029 66.6801 8.31804L68.7144 8.02541C68.7144 7.58534 69.1099 7.22777 69.7882 7.22777C70.5935 7.22777 70.9182 7.61283 70.9182 8.1056V8.69726C70.6218 8.6007 69.8873 8.49066 69.3359 8.49066C67.3016 8.49066 66.3691 9.3685 66.3691 10.7046C66.3691 11.9821 67.2891 12.9582 68.9547 12.9582ZM69.5057 11.3085C68.8557 11.3085 68.517 11.0059 68.517 10.5939C68.517 10.2089 68.8842 9.9063 69.5902 9.9063C70.0446 9.89936 70.496 9.97891 70.9188 10.1404V10.2095C70.9182 10.7999 70.3958 11.3085 69.5057 11.3085ZM77.0497 12.9582C77.742 12.9582 78.3183 12.8347 78.5469 12.7522V10.9919H78.4057C78.18 11.0739 77.9409 11.1157 77.6997 11.1154C77.0497 11.1154 76.7526 10.8269 76.7526 10.1533V7.44548H78.5187V5.64417H76.7526V3.17162H76.6119L74.6761 3.85223V5.64593H73.3766V7.44548H74.5771V10.6642C74.5771 11.9686 75.3407 12.9582 77.0497 12.9582ZM80.4212 4.91556C81.2548 4.91556 81.7353 4.4474 81.7353 3.67843C81.7353 2.92233 81.2521 2.45473 80.4212 2.45473C79.5598 2.45473 79.1075 2.9229 79.1075 3.67843C79.1075 4.44798 79.5598 4.91556 80.4212 4.91556ZM79.3195 12.8347H81.4938V5.64417H79.3195V12.8347ZM84.3058 12.8347H87.0891L89.4059 5.78346V5.64593H87.2018L85.7471 10.8432H85.6903L84.1931 5.64593H81.9583V5.78346L84.3058 12.8347ZM92.7162 12.9582C94.736 12.9582 95.9088 11.8176 96.1062 10.5249H94.0015C93.8745 10.855 93.5212 11.24 92.7162 11.24C91.7269 11.24 91.2889 10.6489 91.2752 9.81032H96.2053V9.02674C96.2053 7.07445 94.937 5.52068 92.674 5.52068C90.2719 5.52068 89.0574 7.21137 89.0574 9.24618C89.0574 11.3085 90.3849 12.9582 92.7162 12.9582ZM91.2889 8.47545C91.332 7.78782 91.7415 7.25177 92.674 7.25177C93.5352 7.25177 93.9453 7.78782 93.9875 8.47545H91.2889Z"
                fill="black"
              />
              <path
                d="M98.4956 2.06957L105.742 0V17C100.25 14.6939 98.6229 11.4565 98.4956 10.1261V2.06957Z"
                fill="black"
              />
              <path
                d="M112.989 2.06957L105.742 0V17C111.234 14.6939 112.862 11.4565 112.989 10.1261V2.06957Z"
                fill="black"
              />
              <mask
                id="mask0_590_642"
                maskUnits="userSpaceOnUse"
                x="101"
                y="4"
                width="10"
                height="8"
              >
                <path
                  d="M110.284 4.51903H101.132V11.287H110.284V4.51903Z"
                  fill="white"
                />
              </mask>
              <g mask="url(#mask0_590_642)">
                <path
                  d="M101.285 4.51903V5.74136H102.013H102.741V4.51903H102.013H101.285ZM101.285 6.25001V8.66597V11.0819H102.741V8.66597V6.25001H102.013H101.285ZM108.787 5.11308V7.00472C108.242 6.4551 107.365 6.16797 106.284 6.16797C104.675 6.16797 103.295 6.82426 103.295 8.67006C103.295 10.5159 104.675 11.164 106.284 11.164C107.365 11.164 108.242 10.8768 108.787 10.3272V11.0819H110.243V4.51903L108.787 5.11308ZM106.769 9.99084C105.466 9.99084 104.76 9.62168 104.76 8.67006C104.76 7.71025 105.466 7.34109 106.769 7.34109C108.072 7.34109 108.787 7.71025 108.787 8.67006C108.787 9.62168 108.072 9.99084 106.769 9.99084Z"
                  fill="white"
                />
              </g>
              <path
                d="M2.11227 7.52861C2.51023 7.52861 2.85922 7.61854 3.15921 7.79842C3.46535 7.97248 3.70108 8.23068 3.86638 8.57304C4.03782 8.90956 4.12352 9.31574 4.12352 9.79154C4.12352 10.2673 4.03782 10.6764 3.86638 11.0187C3.70108 11.3553 3.46535 11.6135 3.15921 11.7934C2.85922 11.9674 2.51023 12.0545 2.11227 12.0545C1.72043 12.0545 1.40512 11.9674 1.16634 11.7934C0.927561 11.6193 0.753071 11.3611 0.642866 11.0187V13.7081H0V7.61563H0.642866V8.56431C0.753071 8.22198 0.927561 7.96378 1.16634 7.78972C1.40512 7.61563 1.72043 7.52861 2.11227 7.52861ZM2.11227 11.4539C2.51023 11.4539 2.83779 11.3118 3.09492 11.0274C3.35209 10.7431 3.48067 10.3312 3.48067 9.79154C3.48067 9.25192 3.35209 8.83994 3.09492 8.55561C2.83779 8.27131 2.51023 8.12914 2.11227 8.12914C1.66533 8.12914 1.30716 8.24808 1.03777 8.486C0.774499 8.71809 0.642866 9.15326 0.642866 9.79154C0.642866 10.4298 0.774499 10.8679 1.03777 11.1058C1.30716 11.3379 1.66533 11.4539 2.11227 11.4539Z"
                fill="black"
              />
              <path
                d="M6.92719 12.0545C6.51088 12.0545 6.14657 11.9616 5.83433 11.776C5.5221 11.5903 5.28025 11.3263 5.10882 10.9839C4.94351 10.6416 4.86084 10.2441 4.86084 9.79154C4.86084 9.33894 4.94351 8.94148 5.10882 8.59915C5.28025 8.25679 5.5221 7.9928 5.83433 7.80712C6.14657 7.62145 6.51088 7.52861 6.92719 7.52861C7.34354 7.52861 7.70782 7.62145 8.02008 7.80712C8.33232 7.9928 8.57111 8.25679 8.73641 8.59915C8.90785 8.94148 8.99355 9.33894 8.99355 9.79154C8.99355 10.2441 8.90785 10.6416 8.73641 10.9839C8.57111 11.3263 8.33232 11.5903 8.02008 11.776C7.70782 11.9616 7.34354 12.0545 6.92719 12.0545ZM6.92719 11.4539C7.36801 11.4539 7.71394 11.3147 7.96498 11.0361C8.22211 10.7576 8.3507 10.3428 8.3507 9.79154C8.3507 9.24031 8.22211 8.82542 7.96498 8.54691C7.71394 8.2684 7.36801 8.12914 6.92719 8.12914C6.48637 8.12914 6.13741 8.2684 5.88025 8.54691C5.62924 8.82542 5.50372 9.24031 5.50372 9.79154C5.50372 10.3428 5.62924 10.7576 5.88025 11.0361C6.13741 11.3147 6.48637 11.4539 6.92719 11.4539Z"
                fill="black"
              />
              <path
                d="M15.0344 7.61563H15.6773L14.3088 11.9674H13.6201L12.6099 8.60785L11.5905 11.9674H10.9017L9.54248 7.61563H10.1853L11.1772 10.9491L11.2047 11.0187L12.3068 7.61563H12.9038L13.9966 11.01L14.0242 10.9491L15.0344 7.61563Z"
                fill="black"
              />
              <path
                d="M16.697 10.0701C16.7398 10.5284 16.8868 10.8737 17.1378 11.1058C17.3888 11.3379 17.7133 11.4539 18.1113 11.4539C18.4602 11.4539 18.7511 11.3698 18.9837 11.2015C19.2164 11.0274 19.3756 10.7722 19.4613 10.4356H20.1225C20.0307 10.9288 19.8041 11.3234 19.4429 11.6193C19.0878 11.9094 18.6439 12.0545 18.1113 12.0545C17.6949 12.0545 17.3307 11.9616 17.0184 11.776C16.7062 11.5903 16.4643 11.3263 16.2929 10.9839C16.1276 10.6416 16.0449 10.2441 16.0449 9.79154C16.0449 9.33894 16.1276 8.94148 16.2929 8.59915C16.4643 8.25679 16.7062 7.9928 17.0184 7.80712C17.3307 7.62145 17.6949 7.52861 18.1113 7.52861C18.7541 7.52861 19.2592 7.74909 19.6266 8.19008C19.9939 8.62525 20.1776 9.25192 20.1776 10.0701H16.697ZM19.498 9.51303C19.3817 8.59045 18.9194 8.12914 18.1113 8.12914C17.7133 8.12914 17.3888 8.2452 17.1378 8.4773C16.8868 8.70939 16.7398 9.05463 16.697 9.51303H19.498Z"
                fill="black"
              />
              <path
                d="M22.6299 7.61563C22.7585 7.61563 22.8626 7.62724 22.9422 7.65046C23.0217 7.66786 23.1136 7.70846 23.2177 7.77228V8.38155C23.1197 8.31773 23.0279 8.2771 22.9422 8.2597C22.8564 8.2365 22.7524 8.22489 22.6299 8.22489C22.4707 8.22489 22.3146 8.27131 22.1615 8.36414C22.0146 8.45119 21.8922 8.59045 21.7942 8.78191C21.6962 8.96759 21.6472 9.20259 21.6472 9.48689V11.9674H21.0044V7.61563H21.6472V8.59915C21.7391 8.29162 21.8738 8.05083 22.0513 7.87673C22.2289 7.70267 22.4217 7.61563 22.6299 7.61563Z"
                fill="black"
              />
              <path
                d="M24.3288 10.0701C24.3716 10.5284 24.5186 10.8737 24.7696 11.1058C25.0206 11.3379 25.3451 11.4539 25.7431 11.4539C26.0921 11.4539 26.3829 11.3698 26.6156 11.2015C26.8482 11.0274 27.0074 10.7722 27.0931 10.4356H27.7543C27.6625 10.9288 27.436 11.3234 27.0748 11.6193C26.7196 11.9094 26.2758 12.0545 25.7431 12.0545C25.3268 12.0545 24.9625 11.9616 24.6502 11.776C24.338 11.5903 24.0961 11.3263 23.9247 10.9839C23.7594 10.6416 23.6768 10.2441 23.6768 9.79154C23.6768 9.33894 23.7594 8.94148 23.9247 8.59915C24.0961 8.25679 24.338 7.9928 24.6502 7.80712C24.9625 7.62145 25.3268 7.52861 25.7431 7.52861C26.386 7.52861 26.8911 7.74909 27.2584 8.19008C27.6258 8.62525 27.8094 9.25192 27.8094 10.0701H24.3288ZM27.1299 9.51303C27.0135 8.59045 26.5513 8.12914 25.7431 8.12914C25.3451 8.12914 25.0206 8.2452 24.7696 8.4773C24.5186 8.70939 24.3716 9.05463 24.3288 9.51303H27.1299Z"
                fill="black"
              />
              <path
                d="M32.5804 5.87491V11.9674H31.9378V11.0187C31.8275 11.3611 31.6529 11.6193 31.4142 11.7934C31.1754 11.9674 30.8602 12.0545 30.4682 12.0545C30.0703 12.0545 29.7183 11.9674 29.4121 11.7934C29.1121 11.6135 28.8764 11.3553 28.705 11.0187C28.5397 10.6764 28.457 10.2673 28.457 9.79154C28.457 9.31574 28.5397 8.90956 28.705 8.57304C28.8764 8.23068 29.1121 7.97248 29.4121 7.79842C29.7183 7.61854 30.0703 7.52861 30.4682 7.52861C30.8602 7.52861 31.1754 7.61563 31.4142 7.78972C31.6529 7.96378 31.8275 8.22198 31.9378 8.56431V5.87491H32.5804ZM30.4682 11.4539C30.9152 11.4539 31.2702 11.3379 31.5337 11.1058C31.8031 10.8679 31.9378 10.4298 31.9378 9.79154C31.9378 9.15326 31.8031 8.71809 31.5337 8.486C31.2702 8.24808 30.9152 8.12914 30.4682 8.12914C30.0703 8.12914 29.7426 8.27131 29.4856 8.55561C29.2285 8.83994 29.0999 9.25192 29.0999 9.79154C29.0999 10.3312 29.2285 10.7431 29.4856 11.0274C29.7426 11.3118 30.0703 11.4539 30.4682 11.4539Z"
                fill="black"
              />
              <path
                d="M37.3588 7.52861C37.7567 7.52861 38.1058 7.61854 38.4055 7.79842C38.7118 7.97248 38.9476 8.23068 39.113 8.57304C39.2842 8.90956 39.3699 9.31574 39.3699 9.79154C39.3699 10.2673 39.2842 10.6764 39.113 11.0187C38.9476 11.3553 38.7118 11.6135 38.4055 11.7934C38.1058 11.9674 37.7567 12.0545 37.3588 12.0545C36.9669 12.0545 36.6516 11.9674 36.4129 11.7934C36.1741 11.6193 35.9995 11.3611 35.8892 11.0187V11.9674H35.2466V5.87491H35.8892V8.56431C35.9995 8.22198 36.1741 7.96378 36.4129 7.78972C36.6516 7.61563 36.9669 7.52861 37.3588 7.52861ZM37.3588 11.4539C37.7567 11.4539 38.0844 11.3118 38.3413 11.0274C38.5985 10.7431 38.727 10.3312 38.727 9.79154C38.727 9.25192 38.5985 8.83994 38.3413 8.55561C38.0844 8.27131 37.7567 8.12914 37.3588 8.12914C36.9118 8.12914 36.5535 8.24808 36.2841 8.486C36.0209 8.71809 35.8892 9.15326 35.8892 9.79154C35.8892 10.4298 36.0209 10.8679 36.2841 11.1058C36.5535 11.3379 36.9118 11.4539 37.3588 11.4539Z"
                fill="black"
              />
              <path
                d="M43.7896 7.61563L42.1089 11.9674C41.962 12.3562 41.8091 12.6724 41.6497 12.9161C41.4907 13.1598 41.2887 13.3513 41.0437 13.4906C40.8049 13.6356 40.5019 13.7081 40.1347 13.7081V13.1076C40.465 13.1076 40.7223 13.0206 40.906 12.8465C41.0895 12.6724 41.2611 12.3794 41.4202 11.9674L39.7397 7.61563H40.4284L41.7693 11.0797L43.1009 7.61563H43.7896Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_590_642">
                <rect width="113" height="17" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </Container>
  );
}

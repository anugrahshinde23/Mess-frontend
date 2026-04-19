import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../../index.css'
import Shepherd from 'shepherd.js'
import 'shepherd.js/dist/css/shepherd.css'
import { useAuth } from '../../context/AuthContext';
import { logoutApi } from '../../services/auth.services';
import { toast } from 'react-toastify';

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

let voices = [];
window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
};

let lastText = "";

const speak = (text) => {
  return new Promise((resolve) => {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    lastText = text;

    utterance.voice =
      voices.find(v => v.name.includes("Google UK English Female")) ||
      voices.find(v => v.lang === "en-US") ||
      voices[0];

    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = resolve;
    utterance.onerror = resolve;

    window.speechSynthesis.speak(utterance);
  });
};

const HowItWorks = () => {

  // 🔥 ADD THIS helper (TOP LEVEL - after variables)


  const simulateClick = async (element) => {
    if (!element) return;
  
    // Scroll into view
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  
    // Add highlight ring
    element.classList.add("demo-click-highlight");
  
    await wait(300);
  
    // Press effect
    element.classList.add("demo-click-press");
  
    await wait(150);
  
    // Remove press
    element.classList.remove("demo-click-press");
  
    // Trigger actual click
    element.click();
  
    await wait(200);
  
    // Remove highlight
    element.classList.remove("demo-click-highlight");
  };

  const typeText = async (element, realText, isPassword = false) => {
    element.focus();
  
    for (let i = 0; i <= realText.length; i++) {
      
      // 👉 What user sees
      if (isPassword) {
        element.value = "*".repeat(i);
      } else {
        element.value = "*".repeat(i); // for phone also masked
      }
  
      // 👉 But send REAL value to React state
      const event = new Event("input", { bubbles: true });
  
      Object.defineProperty(event, "target", {
        writable: false,
        value: { value: realText.slice(0, i) },
      });
  
      element.dispatchEvent(event);
  
      await wait(30 + Math.random() * 70);
    }
  };

  const [running, setRunning] = useState(false);
  const navigate = useNavigate();
  

  const getStepContent = (text) => `
  <div>
    <p style="margin-bottom:10px;">${text}</p>
  </div>
`;

  const startTour = () => {
    if (running) return;
    setRunning(true);

    let autoNextTimeout = null;

    const stopAutoFlow = () => {
      if (autoNextTimeout) {
        clearTimeout(autoNextTimeout);
        autoNextTimeout = null;
      }
    };



    const tour = new Shepherd.Tour({
      defaultStepOptions: {
        cancelIcon: { enabled: true },
        scrollTo: { behavior: "smooth", block: "center" },
        classes: "custom-shepherd",

        buttons: [
          {
            text: 'Stop Tour',
            classes: 'btn-stop',
            action() {
              clearTimeout(autoNextTimeout); // <--- STOP THE TIMER
              setRunning(false)
              navigate('/how-messmate-works')
               speak("Stopping tour")
              return this.complete();
            }
          },
          {
            text: 'Back',
            classes: 'btn-back',
            action() {
              clearTimeout(autoNextTimeout); // <--- STOP THE TIMER
              return this.back();
            }
          },
          {
            text: 'Next',
            classes: 'btn-next',
            action() {
              clearTimeout(autoNextTimeout); // <--- STOP THE TIMER
              return this.next();
            }
          }
        ]
      },
      useModalOverlay: true,
    });

    const scheduleNext = (tour) => {
     
    
      clearTimeout(autoNextTimeout);
    
      autoNextTimeout = setTimeout(() => {
      
          tour.next();
        
      }, 2000);
    };


    const addTourStep = (stepConfig) => {
      tour.addStep({
        ...stepConfig,
        when: {
          show: async () => {
            clearTimeout(autoNextTimeout);
    
            if (stepConfig.when?.show) {
              await stepConfig.when.show();
            }
    
            if (!tour.isActive()) return;
    
            // ✅ CONTROLLED FLOW
            clearTimeout(autoNextTimeout);
          autoNextTimeout = setTimeout(() => {
            if (tour.isActive()) {
              tour.next();
            }
          }, 3000);
          },
        },
      });
    };

    // ===== INTRO =====
    addTourStep({
      text: getStepContent("Hey Verity here."),
      
      classes: "bg-white p-4 rounded-2xl shadow-2xl border-2 border-indigo-500 z-[9999]",
      when: {
        show: async () => {
          await wait(500);
          await speak("Hey! I’m Verity… let me walk you through everything.");
          navigate("/");
        },
      },
    });

    // ===== HOME =====
    addTourStep({
      attachTo: { element: "#navbar", on: "bottom" },
      text: getStepContent("At the top, this is your navigation bar."),
      
      when: {
        show: async () => {
          await speak("At the top, this is your navigation bar. From here, you can explore everything.");
        },
      },
    });

    addTourStep({
      attachTo: { element: "#aboutus-btn", on: "bottom" },
      text: getStepContent("At the top, this is your navigation bar."),
      
      when: {
        show: async () => {
          await speak("this is about us button.");
        },
      },
    });

     // ===== ABOUT =====
     addTourStep({
      text: getStepContent("Let me take you to the about page."),
      
      when: {
        show: async () => {
          await speak("Now let me take you to the about page.");
          navigate("/aboutus");
        },
      },
    });

    addTourStep({
      attachTo: { element: "#about-head", on: "bottom" },
      text: getStepContent("About section"),
      
      when: {
        show: async () => {
          await speak("This page tells you more about our mission and vision.");
        },
      },
    });

    addTourStep({
      attachTo: { element: "#about-img", on: "bottom" },
      text: getStepContent("About image"),
      
      when: {
        show: async () => {
          await speak("Here you can visually understand what we are building.");
        },
      },
    });

    addTourStep({
      text: getStepContent("Let me take you back to the home."),
      
      when: {
        show: async () => {
          await speak("Now let me take you back to the home.");
          navigate("/");
        },
      },
    });



    addTourStep({
      attachTo: { element: "#contactus-btn", on: "bottom" },
      text: getStepContent("Contact us button"),
      
      when: {
        show: async () => {
          await speak("This is contact us button.");
        },
      },
    });

      // ===== CONTACT =====
      addTourStep({
        text: getStepContent("Let’s go to contact page."),
        
        when: {
          show: async () => {
            await speak("Now let’s move to the contact page.");
            navigate("/contact-us");
          },
        },
      });
  
      addTourStep({
        attachTo: { element: "#contact-head", on: "top" },
        text: getStepContent("Contact page"),
        
        when: {
          show: async () => {
            await speak("This is our contact page where you can reach out to us.");
          },
        },
      });
  
      addTourStep({
        attachTo: { element: "#contact-form", on: "top" },
        text: getStepContent("Contact form"),
        
        when: {
          show: async () => {
            await speak("You can use this form to send us your queries anytime.");
          },
        },
      });


      addTourStep({
        text: getStepContent("Let me take you back to the home."),
        
        when: {
          show: async () => {
            await speak("Now let me take you back to the home.");
            navigate("/");
          },
        },
      });
  



    addTourStep({
      attachTo: { element: "#banner", on: "bottom" },
      text: getStepContent("This is the main section users see first."),
      
      when: {
        show: async () => {
          await speak("This is the main section that most users interact with first.");
        },
      },
    });

    addTourStep({
      attachTo: { element: "#services", on: "top" },
      text: getStepContent("These are your services."),
      
      when: {
        show: async () => {
          await speak("Here are the services we provide to make everything simple.");
        },
      },
    });

    addTourStep({
      attachTo: { element: "#mess", on: "top" },
      text: getStepContent("Register your mess here."),
      
      when: {
        show: async () => {
          await speak("If you own a mess, this is where you can register it.");
        },
      },
    });

    addTourStep({
      attachTo: { element: "#delivery", on: "top" },
      text: getStepContent("Become delivery partner."),
      
      when: {
        show: async () => {
          await speak("And if you're looking to earn, you can join as a delivery partner right here.");
        },
      },
    });

    addTourStep({
      attachTo: { element: "#team", on: "top" },
      text: getStepContent("Meet our team."),
      
      when: {
        show: async () => {
          await speak("Meet the persons behind this website.");
        },
      },
    });

    addTourStep({
      attachTo: { element: "#footer", on: "top" },
      text: getStepContent("End."),
      
      when: {
        show: async () => {
          await speak("Some important links and contacts for you to explore messmate more.");
        },
      },
    });


    // ===== END =====
    addTourStep({
      text: getStepContent("Tour finished"),
      
      when: {
        show: async () => {
          await speak("That’s everything! Thankyou.");
          navigate('/')
          tour.complete();
          setRunning(false);
        },
      },
    });

  

    tour.start();
  };







 const { logout } = useAuth()

   const handleLogout = async() => {
    try {
        const res = await logoutApi()

        console.log(res);

        toast.success(res.message)

        logout()
        
        
    } catch (error) {
        toast.error(error.response?.data?.message)
    }
   }








  const startCustomerFlow = () => {

    if (running) return;
  setRunning(true);

  let autoNextTimeout = null;
    
    

    window.isDemoLoginSuccess = false;
    const tour = new Shepherd.Tour({
      defaultStepOptions: {
        cancelIcon: { enabled: true },
        scrollTo: { behavior: "smooth", block: "center" },
        classes: "custom-shepherd",

        buttons: [
          {
            text: 'Stop Tour',
            classes: 'btn-stop',
            action() {
              clearTimeout(autoNextTimeout);
              setRunning(false);
              speak("Stopping tour");
            
              // 1. Logic-first logout (much more reliable than a DOM click)
              const performLogout = async () => {
                try {
                await handleLogout()
            
                  // 2. Small delay to let the logout process begin
                  setTimeout(() => {
                    navigate('/how-messmate-works');
                    this.complete();
                  }, 100); 
                } catch (err) {
                  console.error("Logout failed", err);
                }
              };
            
              performLogout();
            }
          },
          {
            text: 'Back',
            classes: 'btn-back',
            action() {
              clearTimeout(autoNextTimeout); // <--- STOP THE TIMER
              return this.back();
            }
          },
          {
            text: 'Next',
            classes: 'btn-next',
            action() {
              clearTimeout(autoNextTimeout); // <--- STOP THE TIMER
              return this.next();
            }
          }
        ]
      },
      useModalOverlay: true,
    });

    const scheduleNext = (tour) => {
     
    
      clearTimeout(autoNextTimeout);
    
      autoNextTimeout = setTimeout(() => {
        if (tour.isActive()){
          tour.next();
        }
        
        
      }, 1200);
    };
  
    
  


  const addTourStep = (stepConfig) => {
    tour.addStep({
      ...stepConfig,
      when: {
        show: async () => {
          clearTimeout(autoNextTimeout);
  
          if (stepConfig.when?.show) {
            await stepConfig.when.show();
          }
  
          if (!tour.isActive()) return;
  
          // ✅ CONTROLLED FLOW
          clearTimeout(autoNextTimeout);
        autoNextTimeout = setTimeout(() => {
          if (tour.isActive()) {
            tour.next();
          }
        }, 3000);
        },
      },
    });
  };

    // ===== STEP 1 =====
    addTourStep({
      text: getStepContent("Hey 👋 I’m Verity. Let’s explore customer flow."),
      
      when: {
        show: async () => {
          await speak("Hey! I’m Verity. Let’s explore customer flow.");
  
          navigate("/auth");
  
          
        },
      },
    });
  
    // ===== STEP 2 =====
    addTourStep({
      text: getStepContent("Let me log you in with demo account."),
      
      when: {
        show: async () => {
          await wait(1500);
          await speak("I will log in using a demo account.");
  
          

// ✅ THIS IS THE REAL FIX
window.setDemoLogin("3333333333", "123");

// Optional (only for animation UI)
await typeText(document.getElementById("demo-phone"), "3333333333");
await typeText(document.getElementById("demo-password"), "123", true);
  
scheduleNext(tour);         
        },
      },
    });
  
    // ===== STEP 3 =====
    addTourStep({
      attachTo: { element: "#demo-login-btn", on: "top" },
      text: getStepContent("Now clicking login."),
      
      when: {
        show: async () => {
          await speak("Now logging you in.");
    
          // ✅ WAIT so React state updates
          await wait(1000);

          await simulateClick(document.getElementById("demo-login-btn"));
    
          
    
          const waitForLogin = async () => {
            while (!window.isDemoLoginSuccess) {
              await wait(300);
            }
          };
          
          await waitForLogin();
          scheduleNext(tour);
        },
      },
    });
  
    // ===== STEP 4 =====
    addTourStep({
      text: getStepContent("Welcome to customer dashboard 🎉"),
      
      when: {
        show: async () => {
          await speak("Welcome! This is your customer dashboard.");
  
          scheduleNext(tour);
        },
      },
    });

    addTourStep({
      text : getStepContent("Customer Navbar"),
      attachTo : {element : "#customer-nav", on : "bottom"},
      
      when: {
        show: async () => {
          await speak("This is navigation bar for customer you can navigate through it")
          scheduleNext(tour);
        }
      }
    })

    addTourStep({
      text : getStepContent("Notification"),
      attachTo : {element : "#customer-notification", on: "bottom"},
      
      when : {
        show : async () => {
          await speak("Here you can see all your notification")
          scheduleNext(tour);
        }
      }
    })

    addTourStep({
      text : getStepContent("User Profile"),
      attachTo : {element : "#user-profile", on: "bottom"},
      
      when : {
        show : async () => {
          await speak("This is user profile here you can see you information")
          scheduleNext(tour);
        }
      }
    })

    addTourStep({
      text: getStepContent("Now clicking profile"),
      attachTo : {element : "#user-profile", on: "bottom"},
      
      when: {
        show: async () => {
          await speak("Now clicking user profile");
    
          // 🔥 WAIT until element exists
          let el = null;
          for (let i = 0; i < 10; i++) {
            el = document.getElementById("user-profile");
            if (el) break;
            await wait(200);
          }
    
          // ✅ Safe click
          if (el && typeof el.click === "function") {
            await simulateClick(document.getElementById("user-profile"));
            
          } else {
            console.log("user-profile not found");
          }
    
          scheduleNext(tour);
        },
      },
    });

    addTourStep({
      text : getStepContent("Here you can see your subscription updates"),
      attachTo : {element : "#customer-subs-info"},
      
      when : {
        show : async () => {
          await speak("Your subscription information and updates will be shown here")
          scheduleNext(tour);
        }
      }
    })

    addTourStep({
      text : getStepContent("Order history"),
      attachTo : {element : "#customer-order-history-btn", on : "top"},
      
      when : {
        show : async () => {
          await speak("After clicking this button you will be able to see your order")
          scheduleNext(tour);
        }
      }
    })

    addTourStep({
      text : getStepContent("Clicking..."),
      attachTo : {element : "#customer-order-history-btn", on : "top"},
      
      when : {
        show : async () => {
          await speak("Now clicking the order history button")
          await simulateClick(document.getElementById("customer-order-history-btn"));
          
          scheduleNext(tour);
        }
      }
    })

    addTourStep({
      text : getStepContent("Order history"),
      attachTo : {element : "#customer-order-history-page"},
      
      when : {
        show : async () => {
          await speak("Here you order history will be displayed")
          window.openProfileModal = true;
          navigate(-1)
          scheduleNext(tour);
        }
      }
    })

    addTourStep({
      text : getStepContent("Payment history"),
      attachTo : {element : "#customer-payment-history-btn"},
      
      when : {
        show : async () => {
          await speak("After clicking this button you will be able to see your payments")
          scheduleNext(tour);
        }
      }
    })

    addTourStep({
      text : getStepContent("Clicking..."),
      attachTo : {element : "#customer-payment-history-btn"},
      
      when : {
        show : async () => {
          await speak("Now clicking the payment history button")
          
          await simulateClick(document.getElementById("customer-payment-history-btn"));
          scheduleNext(tour);
        }
      }
    })

    addTourStep({
      text : getStepContent("Payment history"),
      attachTo : {element : "#customer-payment-history-page"},
      
      when : {
        show : async () => {
          await speak("Here you payment history will be displayed")
          window.openProfileModal = true;
          navigate(-1)
          scheduleNext(tour);
        }
      }
    })

    addTourStep({
      text : getStepContent("Logout Button"),
      attachTo : {element : "#customer-logout-btn"},
      
      when : {
        show : async () => {
          await speak("This is your logout button but i am not going to click it ...")
          
          
          scheduleNext(tour);
        }
      }
    })

    addTourStep({
      text : getStepContent("Name and phone"),
      attachTo : {element : "#customer-info", on: "bottom"},
      
      when : {
        show : async () => {
          await speak("This is your profile. Let me close this for you")
          window.closeCustomerProfileModal?.()
          scheduleNext(tour);
        }
      }
    })


    addTourStep({
      text : getStepContent("Mess listing"),
      attachTo : {element : "#customer-mess-listing-0", on : "bottom"},
      
      when : {
        show : async () => {
          await speak("Here you can see multiple different messes")
          scheduleNext(tour);
        }
      }
    })

    addTourStep({
      text : getStepContent("Explore"),
      attachTo : {element : "#customer-mess-explore-btn-0", on : "bottom"},
      
      when : {
        show : async () => {
          await speak("After clicking on this button you can explore mess")
          scheduleNext(tour);
        }
      }
    })

    addTourStep({
      text : getStepContent("Clicking..."),
      attachTo : {element : "#customer-mess-explore-btn-0", on : "top"},
      
      when : {
        show : async () => {
          await speak("Clicking the explore button")
          await simulateClick(document.getElementById("customer-mess-explore-btn-0"));
          
          scheduleNext(tour);
        }
      }
    })

    addTourStep({
      text : getStepContent("About Mess"),
      attachTo : {element : "#customer-mess-detail-page", on : "bottom"},
      
      when : {
        show : async () => {
          await speak("Some more details about mess")
          
          scheduleNext(tour);
        }
      }
    })

    addTourStep({
      text : getStepContent("Today's Menu"),
      attachTo : {element : "#customer-mess-menu", on : "bottom"},
      
      when : {
        show : async () => {
          await speak("Here you can explore the menu for today")
          
          scheduleNext(tour);
        }
      }
    })

    addTourStep({
      text : getStepContent("Subscription Plans"),
      attachTo : {element : "#customer-subscription-plans", on : "top"},
      
      when : {
        show : async () => {
          await speak("You can subscribe to any plan available or can also order food .")
          navigate(-1)
          scheduleNext(tour);
        }
      }
    })


     addTourStep({
      text: getStepContent("That's all for customer flow"),
      
      when: {
        show: async () => {
          await speak("That's all for customer flow.");
  
          scheduleNext(tour);
        },
      },
    });


    addTourStep({
      text: getStepContent("Now clicking profile"),
      attachTo : {element : "#user-profile", on: "bottom"},
      
      when: {
        show: async () => {
          await speak("Now clicking user profile");
    
          // 🔥 WAIT until element exists
          let el = null;
          for (let i = 0; i < 10; i++) {
            el = document.getElementById("user-profile");
            if (el) break;
            await wait(200);
          }
    
          // ✅ Safe click
          if (el && typeof el.click === "function") {
            await simulateClick(document.getElementById("user-profile"));
          } else {
            console.log("user-profile not found");
          }
    
          scheduleNext(tour);
        },
      },
    });

    addTourStep({
      text : getStepContent("Logout Button"),
      attachTo : {element : "#customer-logout-btn"},
      
      when : {
        show : async () => {
          await speak("Lets get logout...")
          await simulateClick(document.getElementById("customer-logout-btn"));
          
          scheduleNext(tour);
        }
      }
    })

    
  
    tour.start();
  };

  


  

  return (
    <div className='p-10 flex flex-col items-center gap-20'>
      <p className='text-4xl font-medium text-indigo-900'>How <span className='text-indigo-500'>MessMate</span> Works</p>

      <div className='grid grid-cols-4 bg-white gap-4 w-full '>
        <div className='shadow-xl rounded-2xl group bg-white p-2 hover:-translate-y-2 transition duration-300 '>
          <div>
            <img className="rounded-2xl object-cover" src="https://plus.unsplash.com/premium_photo-1664439520286-6870091ce216?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fDNkfGVufDB8fDB8fHww" alt="" />
          </div>
          <div className='flex flex-col items-center py-5 px-20 gap-2'>
            <p className='text-xl font-medium text-indigo-900'>Create Mess</p>
            <p className='text-sm text-zinc-500 text-center'>Have you own mess? Register it today on MessMate and onboard it online</p>
            <button className='opacity-0 group-hover:opacity-100 bg-indigo-500 hover:bg-indigo-400 mt-3 text-sm font-bold cursor-pointer text-white px-5 py-2 rounded-2xl'>Let Verity Guide You</button>
          </div>
        </div>

        <div className='shadow-xl rounded-2xl group bg-white p-2 hover:-translate-y-2 transition duration-300'>
          <div>
            <img className="rounded-2xl object-cover" src="https://images.unsplash.com/photo-1672080070747-9b28b4b403af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODZ8fDNkfGVufDB8fDB8fHww" alt="" />
          </div>
          <div className='flex flex-col items-center py-5 px-19 gap-2'>
            <p className='text-xl font-medium text-indigo-900'>Become Delivery Boy</p>
            <p className='text-sm text-zinc-500 text-center'>Register as a delivery boy and become a delivery boy for a particular mess in your area</p>
            <button className='opacity-0 group-hover:opacity-100 bg-indigo-500 hover:bg-indigo-400 mt-3 text-sm font-bold cursor-pointer text-white px-5 py-2 rounded-2xl'>Let Verity Guide You</button>
          </div>
        </div>

        <div className='shadow-xl rounded-2xl group bg-white p-2 hover:-translate-y-2 transition duration-300'>
          <div>
            <img className="rounded-2xl object-cover" src="https://images.unsplash.com/photo-1678542800290-f03137472373?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fDNkfGVufDB8fDB8fHww" alt="" />
          </div>
          <div className='flex flex-col items-center py-5 px-20 gap-2'>
            <p className='text-xl font-medium text-indigo-900'>Explore Mess</p>
            <p className='text-sm text-zinc-500 text-center'>Explore the messes all around your area and get subscription today</p>
            <button onClick={() => startCustomerFlow()} className='opacity-0 group-hover:opacity-100 bg-indigo-500 hover:bg-indigo-400 mt-3 text-sm font-bold cursor-pointer text-white px-5 py-2 rounded-2xl'>Let Verity Guide You</button>
          </div>
        </div>

        <div className='shadow-xl rounded-2xl group bg-white p-2 hover:-translate-y-2 transition duration-300'>
          <div>
            <img className="rounded-2xl object-cover" src="https://images.unsplash.com/photo-1626761191814-a9dc9efd085c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDI4fHwzZHxlbnwwfHwwfHx8MA%3D%3D" alt="" />
          </div>
          <div className='flex flex-col items-center py-5 px-19 gap-2'>
            <p className='text-xl font-medium text-indigo-900'>See it in action</p>
            <p className='text-sm text-zinc-500 text-center'>Register as a delivery boy and become a delivery boy for a particular mess in your area</p>
            <button
              onClick={startTour}
              disabled={running}
              className={`opacity-0 group-hover:opacity-100 bg-indigo-500 hover:bg-indigo-400 mt-3 text-sm font-bold text-white px-5 py-2 rounded-2xl 
              ${running ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
            >
              {running ? "Tour Starting..." : "Let Verity Guide You"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
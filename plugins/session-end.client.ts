export default defineNuxtPlugin(async () => {
    if (!import.meta.client) return;
  
    // let sessionId = '';
  
    // const token = localStorage.getItem("Authorization");
    // if (!token) return;
  
    // try {
    //   const res = await apiDataFetch('/users/get-my-sessions', {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Authorization": `Bearer ${token}`,
    //     },
    //   });
  
    //   const data = await res.json();
    //   sessionId = data.data[0]?.id;
  
    //   if (!sessionId) {
    //     console.warn('Session ID not found');
    //     return;
    //   }
  
    //   console.log('Session started:', sessionId);
  
    // } catch (e) {
    //   console.error('Failed to get session:', e);
    //   return;
    // }
  
    // const sendEndSession = () => {
    //   if (!sessionId) return;
  
    //   const payload = {
    //     sessionId,
    //     endTime: new Date().toISOString(),
    //   };
  
    //   const beaconData = new Blob(
    //     [JSON.stringify(payload)],
    //     { type: 'application/json' }
    //   );
  
    //   navigator.sendBeacon(USER_FETCH_HOST + '/users/session-end', beaconData);
    // };
  
    // window.addEventListener('unload', sendEndSession);
    // document.addEventListener('visibilitychange', async () => {
    //   if (document.visibilityState === 'hidden' && sessionId) {
    //     try {
    //       await apiDataFetch('/users/session-end', {
    //         method: 'PATCH',
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'Authorization': `Bearer ${token}`,
    //         },
    //         body: JSON.stringify({
    //           sessionId,
    //           endDate: new Date().toISOString(),
    //         }),
    //       });
    //       console.log('Session end sent on visibilitychange');
    //     } catch (e) {
    //       console.error("Failed to send session end:", e);
    //     }
    //   }
    // });
  });
  
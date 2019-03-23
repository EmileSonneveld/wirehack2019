using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class scenemanager : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void RegisterClicked(){
        SceneManager.LoadScene("Register", LoadSceneMode.Single);
    }

    public void LoginClicked(){
        SceneManager.LoadScene("Login", LoadSceneMode.Single);
    }

    public void BackClicked(){
        SceneManager.LoadScene("Start", LoadSceneMode.Single);
    }

    public void ShopClicked(){
        SceneManager.LoadScene("ChildShop", LoadSceneMode.Single);
    }

}

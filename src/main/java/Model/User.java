package Model;

public class User {
    private int m_iIdUser;
    private String m_strFirstName;
    private String m_strLastName;
    private String m_strEmail;
    private String m_strPassword;

    //Constructores

    public User() {
    }

    public User(int p_iIduser, String p_strFirstName, String p_strLastName, String p_strEmail, String p_strPassword) {
        setIdUser(p_iIduser);
        setFirstName(p_strFirstName);
        setLastName(p_strLastName);
        setEmail(p_strEmail);
        setPassword(p_strPassword);
    }

    //Getter y Setters
    public int getIdUser() {
        return m_iIdUser;
    }

    public void setIdUser(int p_iIdUser) {
        this.m_iIdUser = p_iIdUser;
    }

    public String getFirstName() {
        return m_strFirstName;
    }

    public void setFirstName(String p_strFirstName) {
        this.m_strFirstName = p_strFirstName;
    }

    public String getLastName() {
        return m_strLastName;
    }

    public void setLastName(String p_strLastName) {
        this.m_strLastName = p_strLastName;
    }

    public String getEmail() {
        return m_strEmail;
    }

    public void setEmail(String p_strEmail) {
        this.m_strEmail = p_strEmail;
    }

    public String getPassword() {
        return m_strPassword;
    }

    public void setPassword(String p_strPassword) {
        this.m_strPassword = p_strPassword;
    }

    @Override
    public String toString() {
        return "User{" +
                "Id User=" + m_iIdUser +
                ", First Name ='" + m_strFirstName + '\'' +
                ", Last Name ='" + m_strLastName + '\'' +
                ", Email ='" + m_strEmail + '\'' +
                ", Password='" + m_strPassword + '\'' +
                '}';
    }

    public  String toCadena(User user) {
        return "User{" +
                " id_user=" + user.getIdUser() + ", "
                + " first_name=" + user.getFirstName() + ", "
                + " last_name=" + user.getLastName() + ", "
                + " email=" + user.getEmail() + ", "
                + " password=" + user.getPassword() +
        '}';
    }

}

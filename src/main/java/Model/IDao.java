
package Model;

import javax.lang.model.element.Element;
import java.util.ArrayList;

/**
 *
 * @author S2-PC00
 */
public interface IDao<E,I> {
    public int add(E bean);
    public int delete(Object e);
    public int update(E bean);
    public ArrayList<E> findAll(E bean);
}


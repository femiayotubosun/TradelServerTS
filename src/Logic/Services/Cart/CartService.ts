import { autoInjectable } from "tsyringe";
import { DbContext } from "Lib/Infra/Internal/DBContext";
import { Cart } from "Entities/Cart";
import { CreateCartRecordArgs } from "Logic/Services/Cart";
import { NULL_OBJECT } from "Helpers/Messages/SystemMessages";

@autoInjectable()
export class CartService {
  private cartRepository: any;

  constructor(private dbContext?: DbContext) {
    this.cartRepository = dbContext?.getEntityRepository(Cart);
  }

  public async createCartRecord(createCartRecordArgs: CreateCartRecordArgs) {
    const { customer, queryRunner } = createCartRecordArgs;
    const foundCart = await this.findCartByCustomerId(customer.id);
    if (foundCart) return NULL_OBJECT;
    const cart = new Cart();
    cart.customer = customer;
    await queryRunner.manager.save(cart);
  }

  public async findCartByCustomerId(customerId: number) {
    return await this.cartRepository.findOneBy({ customerId });
  }
}

export default new CartService();
